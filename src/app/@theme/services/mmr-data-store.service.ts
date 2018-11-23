import {Component, Injectable, InjectionToken} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of'
import * as VIEWS from './mock/data';
import {RemoteExecutor} from './cmd/cmd-excutors';
import {Command, CommandResponse,  RootView} from './interfaces';
import * as executors from './cmd/cmd-excutors';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MmrConfiguration } from './config-interface';
import { DataStoreManager } from './mmr-data-store';
import { MmrEventBus } from './mmr-event-bus';
import { MmrAbstractPage } from '../pages/MmrAbstractPage';
import { ArgumentReader, PageArgumentReader, ScriptArgumentReader, ValueArgumentReader, DataStoreArgumentReader } from './arguments-reader';
import { ReaderCongfig } from './interfaces';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CommandExecutor } from './interfaces';
import { createDataPipe } from './data-pipe';
import { PageConfig, Expression } from './configs';


@Injectable()
export class MmrDataStoreService {

  viewId: string;
  rootView: RootView;

  dataStoreManager: DataStoreManager
    private set(value) {this.dataStoreManager = value};

  private pageConfig: PageConfig;
  
  /** 参数解析器 */
  private paramReaders: {
    [type: string] : ArgumentReader
  } = {}

  constructor(
    private mmrConfiguration: MmrConfiguration,
    private httpClient: HttpClient,
    private eventBus: MmrEventBus,
    private activatedRoute: ActivatedRoute,
  ) {

    this.addReader('eval', new ScriptArgumentReader(this.activatedRoute.snapshot, this))
    this.addReader('page', new PageArgumentReader(this.activatedRoute.snapshot))
    this.addReader('value', new ValueArgumentReader())
    this.addReader('datastore', new DataStoreArgumentReader(this))
  }

  addReader(type:string, reader:ArgumentReader) {
    this.paramReaders[type] = reader
  }

  resloveParamter(cfg: ReaderCongfig): any {
    return this.paramReaders[cfg.type || 'value'].get(cfg)
  }

  resloveParamters(configs:Array<ReaderCongfig>) {
    const params = {}
    configs = configs || []
    let value
    configs.forEach(cfg => {
      value = this.resloveParamter(cfg)
      if (value != null) {
        params[cfg.name] = value
      }
    });
    return params
  }

  getDataStoreManager(): DataStoreManager {
    return this.dataStoreManager;
  }

  setupViewId(viewId: string, view: RootView) {
    this.viewId = viewId;
    this.rootView = view;
  }

  getRootView(): RootView {
    return this.rootView;
  }

  /**
   * 执行命令
   * @param {Command} command
   * @returns {Observable<CommandResponse>}
   */
  execute(command: Command) {
    this.createCommandExecutor(command)
      .execute()
      .map(response => {
        if (command.resultOperation) {
          return createDataPipe(command.resultOperation, this).translate(response)
        }
        return response;
      })
      .subscribe()
  //  return this.createCommandExecutor(command).execute();
  }

  createCommandExecutor(command: Command): CommandExecutor {
    // 解析一个命令执行器, 选择顺序:
    // 1. 选择本地命令
    // 2. 选择远程命令
    let executor = null;
    for (const e in executors) {
      if (executors[e].type && executors[e].type == command.type) {
        executor = new executors[e](command, this, this.viewId, this.httpClient, this.mmrConfiguration);
        break;
      }
    }

    if (executor == null) {
      executor = new RemoteExecutor(command, this, this.viewId, this.httpClient, this.mmrConfiguration);
    }

    return executor
  }

  /**
   * 加载初始视图
   * @param {string} viewIdxs
   */
  loadView(viewId: string): Observable<PageConfig> {
    return this.httpClient.get(`/api/v1/views/${viewId}/config`,    {
      observe: 'response',
    })
    .map((response: HttpResponse<PageConfig>) => {
      if (response.body != null) {   
        this.pageConfig = response.body;
        this.parsePageConfig(this.pageConfig)   
        return this.pageConfig
      }
      return this.pageConfig
    });
  }

  /**
   * 解析页面配置信息
   * @param config 
   */
  private parsePageConfig(config: PageConfig) {
    this.dataStoreManager = DataStoreManager.createManager(config.models, this)
    // this.dataStoreManager.recordsChanged.subscribe(evt => {
    //   //TODO 广播改变事件
    // })
  }

  /**
   * 已绑定的数据表达式
   */
  private bindings = {}
  /*
    * 全部数据空间
    */
  private dataSet: any = {}
  

  /**
   * 绑定数据到指定数据空间
   * @param expression 
   * @param data 
   */
  binding(componentRef, property, expression: Expression) {
      if (!this.bindings[componentRef.instance.id]) {
          this.bindings[componentRef.instance.id] = {
              '@@ref@@': componentRef,
          }
      }
      this.bindings[componentRef.instance.id][property] = expression;
  }

  notifyDataChanged(id, instanceProp, value: any) {
    let ref = this.bindings[id];
    let expression = ref[instanceProp].str
    expression = expression.replace(/(?:^\$\{)|(?:\})$/g, '')

    let exps = expression.split("\.");
    let last = this.dataSet;
    for (let i = 0; i < exps.length-1; i++) {
      last = last[exps[i]];    
    }
    last[exps[exps.length - 1]] = value;

    this.updateBindings()
  }

  /**
   * 加载业务数据
   */
  loadData(params: Params): any {
      const dataStore = this.getDataStoreManager()
        .lookupDataStore('primary');
      
      const keys = dataStore.getKeys()
          .map(k => k.id);

      // 加载指定数据
      if (this.containAllKeys(params, keys)) {
        dataStore.loadRemoteData(Object.assign({},this.pickupValues(params,keys)));
      }
      // 新创建的数据集合
      else {
        // TODO 创建新数据集合
        // dataStore.createNewData(Object.apply({},this.pickupValues(params,keys)));
      }      
  }


  private containAllKeys(params: Params, keys: Array<string>): boolean {
      let contains = false
      for (let i = 0; i < keys.length; i++) {
        if (params[keys[i]] == null) {
          contains = false
          break;
        }
        contains = true
      }
      return contains;
  }

  /**
   * 解析指定参数
   * @param params 
   * @param keys 
   */
  private pickupValues(params: Params, keys: Array<string>): {[key:string]: any} {
    const values = {}
    
    keys.forEach(k => {
      values[k] = params[k]
    })

    return values
  }

  /**
   * 更新绑定的数据
   */
  updateBindings() {
      for (let id in this.bindings) {
          let ob = this.bindings[id]
          let ref = ob['@@ref@@']
          for (let prop in ob) {
              if (prop == '@@ref@@') continue;
              ref.instance[prop] = ob[prop].doEval(this.dataSet)
          }
      }
  }
}

export const EVT_MMR_DATASTORE_INITLIZED = 'mmr_datastoe_initlized'
import {Component, Injectable, InjectionToken} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of'
import * as VIEWS from './mock/data';
import {RemoteExecutor} from './cmd/cmd-excutors';
import {Command, CommandResponse,  MmrDataStoreService, RootView} from './interfaces';
import * as executors from './cmd/cmd-excutors';
import { HttpClient } from '@angular/common/http';
import { MmrConfiguration } from './config-interface';
import { DataStoreManager } from './mmr-data-store';
import { MmrEventBus } from './mmr-event-bus';
import { MmrAbstractPage } from '../pages/MmrAbstractPage';
import { ArgumentReader, PageArgumentReader, ScriptArgumentReader, ValueArgumentReader, DataStoreArgumentReader } from './arguments-reader';
import { ReaderCongfig } from './interfaces';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';


@Injectable()
export class DataStoreService extends MmrDataStoreService {

  viewId: string;
  rootView: RootView;
  __dataStoreManager__: DataStoreManager;
  
  
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
    super(mmrConfiguration, httpClient);

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


  setDataStoreManager(dataStoreManager: DataStoreManager): void {
    this.__dataStoreManager__ = dataStoreManager;
  }

  getDataStoreManager(): DataStoreManager {
    return this.__dataStoreManager__;
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
  execute(command: Command): Observable<CommandResponse> {

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

    return executor.execute();
  }

  /**
   * 加载初始视图
   * @param {string} viewIdxs
   */
  loadView(viewId: string): Observable<any> {
    console.log('info', VIEWS)
    let v = {};
    for (const o in VIEWS) {
      if (VIEWS[o].id === viewId) v = VIEWS[o];
    }

    return observableOf(v);
  }
}

export const EVT_MMR_DATASTORE_INITLIZED = 'mmr_datastoe_initlized'

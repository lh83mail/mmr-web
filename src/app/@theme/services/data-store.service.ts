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


@Injectable()
export class DataStoreService extends MmrDataStoreService {

  viewId: string;
  rootView: RootView;
  __dataStoreManager__: DataStoreManager;

  constructor(
    private mmrConfiguration: MmrConfiguration,
    private httpClient: HttpClient,
    private eventBus: MmrEventBus,
  ) {
    super(mmrConfiguration, httpClient);
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

  /** 
   * 初始化数据仓库
   */
  initPageData(page: MmrAbstractPage): void {
    const stores = this.getDataStoreManager().getDataStores();
    if (stores == null) {
      return;
    }

    for (var key in stores) {
      const s = stores[key]; 
      this.execute(page.createInitlizedCommand(s))
    }

  }
}

export const EVT_MMR_DATASTORE_INITLIZED = 'mmr_datastoe_initlized'

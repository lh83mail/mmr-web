import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MmrAbstractPage } from '../pages/MmrAbstractPage';
import { MmrConfiguration } from './config-interface';
import { DataStoreManager } from './mmr-data-store';


export abstract class MmrDataStoreService {
   
  constructor(
    mmrConfiguration: MmrConfiguration,
    httpClient: HttpClient) {}

  abstract setDataStoreManager(dataStoreManager: DataStoreManager): void;
  abstract getDataStoreManager(): DataStoreManager;

  abstract execute(cmd: Command): Observable<CommandResponse>;

  abstract setupViewId(viewId: string, rootView: RootView): void;

  abstract loadView(viewId: string): Observable<any>;

  abstract getRootView(): RootView;

  /**
   * 初始化数据仓库
   */
  abstract initPageData(page: MmrAbstractPage): void;

  setUpDataStore(storesConfigs: any): any {
    const dataSotreManager = DataStoreManager.createManager(storesConfigs, this)
    this.setDataStoreManager(dataSotreManager);
  }
}

export interface RootView {
  loadView(viewId: string);
}


export interface Command {
  type:string;
  command: string;
  args?: {
    [name: string]: any
  };
}

export interface CommandResponse {
  /**
   * 命令运行结果代码
   */
  status: number;
  /**
   * 关联的命令
   */
  command: Command;
  /**
   * 实际数据
   */
  data?: any;
  /**
   * 运行结果可读消息
   */
  message?: string;
}

export abstract class CommandExecutor {
  cmd: Command;
  dataStoreService: MmrDataStoreService;
  viewId: string;

  constructor(cmd: Command, dataStoreService: MmrDataStoreService, viewId: string) {
    this.cmd = cmd;
    this.dataStoreService = dataStoreService;
    this.viewId = viewId;
  }
  abstract execute(): Observable<CommandResponse>;
}

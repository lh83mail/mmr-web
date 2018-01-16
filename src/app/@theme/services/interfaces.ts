import {Component} from '@angular/core';
import { MmrConfiguration, DataStoreManager } from 'app/@theme';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export abstract class MmrDataStoreService {
  constructor(
    mmrConfiguration: MmrConfiguration,
    httpClient: HttpClient) {}

  abstract setDataStoreManager(dataStoreManager: DataStoreManager): void;
  abstract getDataStoreManager(): DataStoreManager;

  abstract execute(cmd: Command, component: any): Observable<CommandResponse>;

  abstract setupViewId(viewId: string, rootView: RootView): void;

  abstract loadView(viewId: string): Observable<any>;

  abstract getRootView(): RootView;
}

export interface RootView {
  loadView(viewId: string);
}


export interface Command {
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
  component: Component;

  constructor(cmd: Command, dataStoreService: MmrDataStoreService, component: Component) {
    this.cmd = cmd;
    this.dataStoreService = dataStoreService;
    this.component = component;
  }
  abstract execute(): Observable<CommandResponse>;
}

import {Component, Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import * as VIEWS from './mock/data';
import {RemoteExecutor} from './cmd/cmd-excutors';
import {Command, CommandResponse,  MmrDataStoreService, RootView} from './interfaces';
import * as executors from './cmd/cmd-excutors';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataStoreService extends MmrDataStoreService {
  viewId: string;
  rootView: RootView;
  dsInstance = {};

  constructor(httpClient: HttpClient) {
    super();
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
   * @returns {Promise<CommandResponse>}
   */
  execute(command: Command): Promise<CommandResponse> {

    // 解析一个命令执行器, 选择顺序:
    // 1. 选择本地命令
    // 2. 选择远程命令
    let executor = null;
    for (const e in executors) {
      if (executors[e].name == command.command) {
        executor = new executors[e](command, this);
      }
    }

    if (executor == null) {
      executor = new RemoteExecutor(command, this);
    }

    return executor.execute();
  }

  /**
   * 加载初始视图
   * @param {string} viewIdxs
   */
  loadView(viewId: string) :Promise<any> {
    console.log('info', VIEWS)
    let v = {};
    for (const o in VIEWS) {
      if (VIEWS[o].id === viewId) v = VIEWS[o];
    }
    
    return Promise.resolve(v);
  }

}
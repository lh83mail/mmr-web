import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { MmrAbstractPage } from '../pages/MmrAbstractPage';
import { MmrConfiguration } from './config-interface';
import { DataStoreManager } from './mmr-data-store';
import { ArgumentReader } from './arguments-reader';
import { PageConfig } from './configs';
import { MmrDataStoreService } from './mmr-data-store.service';

export interface RootView {
  loadView(viewId: string);
}

export interface ReaderCongfig {
  name: string;
  type: string;
  [key:string]: any;
}

/** 
 * 数据处理配置
 */
export abstract class DataPipeConfig {
  name: string = 'BasicDataPipe';   // 数据处理器唯一名称
  next?: DataPipeConfig;            // 下一个处理器
  [key:string]: any;                // 本处理器的附加配置
}


export interface Command {
  type:string;
  command: string;
  args?: {
    [name: string]: any
  },
  resultOperation?: DataPipeConfig
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

  apply(name:string, data: any) : CommandExecutor {
    return this
  }
}

// -----------------

export function SupportExpression(){
  return  function (target: Object, propertyKey: string):void {
    console.log('aaaaaa', arguments)

    if (target['__inner__'] == null) {
      target['__inner__'] = {}
    }
    target['__inner__'][propertyKey] = null
  }
}
import {Component} from '@angular/core';
import { MmrConfiguration } from 'app/@theme';
import { HttpClient } from '@angular/common/http';

export abstract class MmrDataStoreService {
  constructor(
    mmrConfiguration: MmrConfiguration,
    httpClient: HttpClient){}

  abstract execute(cmd: Command): Promise<CommandResponse>;

  abstract setupViewId(viewId: string, rootView: RootView): void;

  abstract loadView(viewId: string): Promise<any>;

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
  status: string;
  command: Command;
  data?: any;
}

export abstract class CommandExecutor {
  cmd: Command;
  dataStoreService: MmrDataStoreService;
  constructor(cmd: Command, dataStoreService: MmrDataStoreService) {
    this.cmd = cmd;
    this.dataStoreService = dataStoreService;
  }
  abstract execute(): Promise<CommandResponse>;
}

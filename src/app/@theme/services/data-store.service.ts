import {Component, Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import * as VIEWS from "../../services/data";
import {RemoteExecutor} from "./cmd/cmd-excutors";
import {Command, CommandResponse, MmrDataSource, MmrDataStoreService, NULL_SOURCE, RootView} from "./interfaces";
import * as executors from "./cmd/cmd-excutors";

@Injectable()
export class DataStoreService extends MmrDataStoreService {
  viewId: string;
  rootView: RootView;
  dsInstance = {};

  setupViewId(viewId: string, view: RootView) {
    this.viewId = viewId;
    this.rootView = view;
  }

  getRootView(): RootView {
    return this.rootView;
  }

  /**
   * 查找数据源
   * @param {String} dsName
   * @returns {Promise<MmrDataSource>}
   */
  lookupDataSource(dsName:String) : Promise<MmrDataSource> {
    return Promise.resolve(null);
  }

  /**
   * 获取所有数据源
   * @returns {Promise<MmrDataSource[]>}
   */
  getDataSources(): Promise<MmrDataSource[]> {
    return Promise.resolve(null);
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
    for (var e in executors) {
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
    for (var o in VIEWS) {
      if (VIEWS[o].id == viewId) v = VIEWS[o];
    }

    //
    const store = (<any> v).dataStore;
    this.createDataSources(store);

    return Promise.resolve(v);
  }

  // 创建数据源
  private createDataSources(store: any) {
    this.dsInstance = {};
    if (store == null) return;
    for (const key in store) {
      const dsCfg = store[key];
      switch (dsCfg.dsType) {
        case 'local':
          this.dsInstance[key] = new LocalMmrDataSource(dsCfg);
          break;
        default:
          this.dsInstance[key] = NULL_SOURCE;
      }
    }
  }

}

export class LocalMmrDataSource implements MmrDataSource {
  data: any;
  constructor(cfg: any) {
    this.data = cfg.data;
  }
}


const SERVICE_DATA_MOCK = {
  'list-data': {
    data: [
      {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
      {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
      {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
      {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
      {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
      {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
      {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
      {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
      {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
      {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
      {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
      {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
      {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
      {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
      {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
      {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
      {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
      {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
      {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
      {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
    ]
  }
}

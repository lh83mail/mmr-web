
import {CommandExecutor, CommandResponse, Command, MmrDataStoreService} from "../interfaces";
import { ComponentRef } from "@angular/core";
import { HttpClient } from "@angular/common/http/src/client";
import { MmrConfiguration } from "app/@theme/services";
import 'rxjs/add/operator/map'
import 'rxjs/operator/toPromise'
import { HttpEvent, HttpResponse } from "@angular/common/http";

export class LoadViewExecutor extends  CommandExecutor {
  execute(): Promise<CommandResponse> {
    this.dataStoreService.getRootView().loadView(this.cmd.args['viewId']);
    return Promise.resolve({status:'200', command: this.cmd});
  }
}

export class NavigateViewExecutor extends CommandExecutor {

  execute(): Promise<CommandResponse> {
    const viewId = this.cmd.args['viewId'];

    return Promise.resolve({status:'200', command: this.cmd});
  }

}

export class RemoteExecutor extends CommandExecutor {
  constructor(cmd: Command,
    dataStoreService: MmrDataStoreService,
    private httpClient: HttpClient,
    private mmrConfiguration: MmrConfiguration
  ) {
    super(cmd, dataStoreService);
  }

  execute(): Promise<CommandResponse> {

    // return Promise.resolve({
    //   status: '200',
    //   command: this.cmd.command,
    //   data: SERVICE_DATA_MOCK[this.cmd.command]
    // });

    const method = this.cmd.args.method || 'GET';
    const options:any = {
      params: this.cmd.args.params,
      observe: 'response',
    };

    if ((method == 'POST' || method == 'PUT') && this.cmd.args.body) {
      options.body = this.cmd.args.body;
    }

  //   request(method: string, url: string, options: {
  //     body?: any;
  //     headers?: HttpHeaders | {
  //         [header: string]: string | string[];
  //     };
  //     reportProgress?: boolean;
  //     observe: 'events';
  //     params?: HttpParams | {
  //         [param: string]: string | string[];
  //     };
  //     responseType?: 'json';
  //     withCredentials?: boolean;
  // }): Observable<HttpEvent<any>>;

    return this.httpClient.request<HttpResponse<any>>(
        method,
        this.mmrConfiguration.getRemoteCommandUrl(this.cmd.command),
        options
    ).map(response => {
      if (response instanceof HttpResponse) {
        return {
          status: '' + response.status,
          command: this.cmd,
          data: response.body
        }
      }
    })
    .toPromise()
    .catch(response => {
      if (response instanceof HttpResponse) {
        return {
          status: '' + 500,
          command: this.cmd
        }
     }
    });
  }
}

export class ViewAction extends CommandExecutor {

  execute(): Promise<CommandResponse> {
    const cmd = this.cmd.args['action'];
    const action = MMR_COMPONENT_FINDER.findComponetInstance(cmd);
    if (action == null) {
      throw new Error('找不到指定的命令');
    }
    return Promise.resolve({status: '200', command: this.cmd, data: action.execute()});
  }

}

export class Action {
  ref: Function;
  target: any;

  execute(...args): any {
    return this.ref.apply(this.target, args);
  }
}


export class CommponetFinder {

  findComponetInstance(cmd: string): Action {
    return null;
  }

}

export const MMR_COMPONENT_FINDER = new CommponetFinder();



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
};

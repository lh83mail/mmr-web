
import {CommandExecutor, CommandResponse, Command} from '../interfaces';
import { ComponentRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http/src/client';
import { MmrConfiguration, MmrComponentRef, MmrDataStoreService } from 'app/@theme/services';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {catchError} from 'rxjs/operators/catchError';
import {of as observableOf} from 'rxjs/observable/of'
import { HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { concat } from 'rxjs/observable/concat'
export class LoadViewExecutor extends  CommandExecutor {
  execute(): Observable<CommandResponse> {
    this.dataStoreService.getRootView().loadView(this.cmd.args['viewId']);
    return observableOf({status: 200, command: this.cmd});
  }
}
LoadViewExecutor['type'] = 'loadView'

export class PageExecutor extends CommandExecutor {
  execute(): Observable<CommandResponse> {
    const cmd = this.cmd.args['action'];
    const action = new Action()
    action.target = (<any>this.dataStoreService.getRootView()).view
    action.ref = (<any>this.dataStoreService.getRootView()).view[cmd]
    return observableOf({status: 200, command: this.cmd, data: action.execute()});
  }
}
PageExecutor['type'] = 'page'

export class NavigateViewExecutor extends CommandExecutor {

  execute(): Observable<CommandResponse> {
    const viewId = this.cmd.args['viewId'];

    return observableOf({status: 200, command: this.cmd});
  }

}
NavigateViewExecutor['type'] = 'navigate'


export class RemoteExecutor extends CommandExecutor {
  constructor(cmd: Command,
    dataStoreService: MmrDataStoreService,
    viewId: string,
    private httpClient: HttpClient,
    private mmrConfiguration: MmrConfiguration
  ) {
    super(cmd, dataStoreService, viewId);
  }

  execute(): Observable<CommandResponse> {
    const method = this.cmd.args.method || 'GET';
    

    const options: any = {
      params:  this.dataStoreService.resloveParamters(this.cmd.args.params),
      observe: 'response',
    }

    if ((method === 'POST' || method === 'PUT')) {
      options.body = this.cmd.args.body || {};
    }

    return this.httpClient.request<HttpResponse<any>>(
        method,
        this.mmrConfiguration.getRemoteCommandUrl(`v1/views/${this.viewId}/commands/${this.cmd.command}`),
        options
    )
    .map(response => {
      if (response instanceof HttpResponse) {
        return {
          status: response.status,
          command: this.cmd,
          data: response.body
        }
      }
    })
    // .catchError(response => {
    //   if (response instanceof HttpErrorResponse) {
    //     return {
    //       status: response.status,
    //       command: this.cmd,
    //       message: response.message
    //     }
    //  }
    // });
  }
}
RemoteExecutor['type'] = 'remote'


export class ViewAction extends CommandExecutor {

  execute(): Observable<CommandResponse> {
    const cmd = this.cmd.args['action'];
    const el = (<any> this.dataStoreService.getRootView()).view.__mmrViews.first.mmrComponentRef
    const action = MMR_COMPONENT_FINDER.findComponetInstance(cmd, el);
    if (action == null) {
      throw new Error(`找不到指定的命令${cmd}`);
    }
    return observableOf({status: 200, command: this.cmd, data: action.execute()});
  }

}
ViewAction['type'] = 'view-action'

export class Action {
  ref: Function;
  target: any;

  execute(...args): any {
    return this.ref.apply(this.target, args);
  }
}


export class DataStoreAction extends CommandExecutor {
  
  execute(): Observable<CommandResponse> {
    const ds = this.dataStoreService.getDataStoreManager().lookupDataStore(this.cmd.args['store'])
    if (ds[this.cmd.command]) {
      ds[this.cmd.command].apply(ds)
    }
    return observableOf({status: 0, command: this.cmd});
  }
}
DataStoreAction['type'] = 'datastore'


/**
 * 
 */
export class CommandChain extends CommandExecutor {

  execute(): Observable<CommandResponse> {
    const chain = this.cmd.args.chain    
    const executors = chain.map(cmd => this.dataStoreService.createCommandExecutor(cmd).execute())
    return concat(executors)
  }
}
CommandChain['type'] = 'chain'

export class CommponetFinder {


  findComponetInstance(cmd: string, startComponent:MmrComponentRef): Action {
    const cmds = cmd.split('.');
    let next:MmrComponentRef = startComponent

    while (next.parentMMrComponentRef != null) {
      next = next.parentMMrComponentRef
    }
    
    const i = 0;
    const inst = null;

    function find(id: string, mmrComponentRef: MmrComponentRef) {
      if (mmrComponentRef == null) {
        return null;
      }

      if (mmrComponentRef.componentRef.instance.id === id) {
        return mmrComponentRef;
      }

      const children = mmrComponentRef.children;
      if (children == null || children.length === 0) {
        return null;
      }

      for (const e of children) {
        mmrComponentRef = find(id, e);
        if (mmrComponentRef != null) {
          return mmrComponentRef;
        }
      }

      return null;
    }

    next = find(cmds[0], next);
    for (let i = 1; i < cmds.length - 1 && next != null; i++) {
      next = find(cmds[i], next);
      console.log("::::", next + " = " + cmds[i])
    }

    if (next == null) {
      return null;
    }
    const act = new Action();
    act.ref  =  next.componentRef.instance[cmds[cmds.length - 1]];
    act.target = next.componentRef.instance;
    return act;
  }

}

export const MMR_COMPONENT_FINDER = new CommponetFinder();
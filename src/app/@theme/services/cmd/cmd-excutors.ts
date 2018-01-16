
import {CommandExecutor, CommandResponse, Command, MmrDataStoreService} from '../interfaces';
import { ComponentRef, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http/src/client';
import { MmrConfiguration } from 'app/@theme/services';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {catchError} from 'rxjs/operators/catchError';
import {of as observableOf} from 'rxjs/observable/of'
import { HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class LoadViewExecutor extends  CommandExecutor {
  execute(): Observable<CommandResponse> {
    this.dataStoreService.getRootView().loadView(this.cmd.args['viewId']);
    return observableOf({status: 200, command: this.cmd});
  }
}

export class NavigateViewExecutor extends CommandExecutor {

  execute(): Observable<CommandResponse> {
    const viewId = this.cmd.args['viewId'];

    return observableOf({status: 200, command: this.cmd});
  }

}

export class RemoteExecutor extends CommandExecutor {
  constructor(cmd: Command,
    dataStoreService: MmrDataStoreService,
    component: Component,
    private httpClient: HttpClient,
    private mmrConfiguration: MmrConfiguration
  ) {
    super(cmd, dataStoreService, component);
  }

  execute(): Observable<CommandResponse> {
    const method = this.cmd.args.method || 'GET';
    const options: any = {
      params: this.cmd.args.params,
      observe: 'response',
    };

    if ((method === 'POST' || method === 'PUT') && this.cmd.args.body) {
      options.body = this.cmd.args.body;
    }

    return this.httpClient.request<HttpResponse<any>>(
        method,
        this.mmrConfiguration.getRemoteCommandUrl(this.cmd.command),
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

export class ViewAction extends CommandExecutor {

  execute(): Observable<CommandResponse> {
    const cmd = this.cmd.args['action'];
    const action = MMR_COMPONENT_FINDER.findComponetInstance(cmd, this.component);
    if (action == null) {
      throw new Error('找不到指定的命令');
    }
    return observableOf({status: 200, command: this.cmd, data: action.execute()});
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

  findComponetInstance(cmd: string, commponent: any): Action {
    const cmds = cmd.split('.');
    let next = commponent.__mmrComponentRef;
    const i = 0;
    const inst = null;

    function find(id, mmrComponentRef) {
      if (mmrComponentRef == null) {
        return null;
      }

      if (mmrComponentRef._componentRef.instance.id === id) {
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

    next = find(cmds[0], commponent.__mmrComponentRef);
    for (let i = 1; i < cmds.length - 1 && next != null; i++) {
      next = find(cmds[i], next);
    }

    if (next == null) {
      throw new Error('command not found');
    }
    const act = new Action();
    act.ref  =  next._componentRef.instance[cmds[cmds.length - 1]];
    act.target = next._componentRef.instance;
    return act;
  }

}

export const MMR_COMPONENT_FINDER = new CommponetFinder();

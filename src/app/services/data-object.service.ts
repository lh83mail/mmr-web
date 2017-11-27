import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {TABLE_VIEW} from "./data";

export class DataObjectService {

  execute(cmd: Command) : Promise<any> {
    return Promise.resolve(TABLE_VIEW)
  }
}

export interface Command {
  viewId: string,
  command: string,
  args?: {
    [name:string] : any
  }
}

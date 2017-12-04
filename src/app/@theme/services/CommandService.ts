import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Subject} from "rxjs/Subject";

@Injectable()
export class CommandService {
  private onInit:Subject<any> = new Subject<any>();

  constructor(private http: Http) {
  }


  execute(command:string, options: any): Promise<any> {


    return Promise.resolve(true);
  }
}

import {Injectable} from '@angular/core';
import {MmrDataStoreService} from "./interfaces";

@Injectable()
export class PageStateService {
  viewId:string;
  rootView: any;

  constructor(
    private dataStoreService: MmrDataStoreService
  ) {
  }

  /**
   * root view id
   * @param {string} viewId
   */
  setViewId(viewId: string, rootView: any) {
    this.viewId = viewId;
    this.rootView = rootView;
  }

  /**
   * 执行组件命令
   * @param {string} command
   */
  execute(scope: any, command: string) {
   let  ids:Array<string> = command.split(".");
   let c = null, start=scope;

   function  find(start, id) {
     if (start.children) {
       for (let s of start.children) {
         if (s.id == id) {
           return s;
         }
       }
     }
     return null;
   }

   if (ids.length > 1) {
     for (let i = 0; i < ids.length - 1; i++) {
       start = find(start, ids[i]);
       if (start == null) break;
     }
   }
   c = start == null ? null : (start.commands ? start.commands[ids[ids.length-1]] : null);

   console.log("command-name", ids[ids.length-1]);
   console.log("command-config", c);
  }
}

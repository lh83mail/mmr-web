import { ActivatedRouteSnapshot } from "@angular/router";
import { MmrDataStoreService } from ".";

/**
 * 参数读取器
 */
export abstract class ArgumentReader {
    constructor(public cfg: ReadCongfig) {

    }
    abstract get():any
}

export interface ReadCongfig {
    name: string,
    type: string,
    [key:string]: any
}


export class PageArgumentReader extends ArgumentReader {
    constructor(
        public cfg:ReadCongfig, 
        private snapshot: ActivatedRouteSnapshot) {
        super(cfg);
    }

    get() {
        switch (this.cfg.from) {
            case 'path':
                return this.snapshot.paramMap.get(this.cfg.name)
            // case 'query': 默认是 query
        }        
        return this.snapshot.queryParamMap.get(this.cfg.name)
    }
}


export class ScriptArgumentReader extends ArgumentReader {
    constructor(
        public cfg:ReadCongfig, 
        private snapshot: ActivatedRouteSnapshot,
        private dataService: MmrDataStoreService
    ) {
        super(cfg);
    }

    get() {
        if (this.cfg.script != null) {
            return (function ($cfg, $snapshot, $dataservice) { return eval($cfg.script) }(
                this.cfg, this.snapshot, this.dataService
            ))
        }
        return null
    }
}


export function mmrResloveParamters(args:Array<ReadCongfig>, route, dataStoreSevice) {
    const params = {}
    args = args || []
    let value

    args.forEach(param => {
      switch(param.type) {
        case 'page':
            value = new PageArgumentReader(param, route.snapshot).get()
            break
        case 'eval':
            value = new ScriptArgumentReader(
                param, 
                route.snapshot, 
                dataStoreSevice
            ).get()
            break
      }

      if (value != null) {
        params[param.name] = value
      }

    });

    return params
  }

import { ActivatedRouteSnapshot } from "@angular/router";
import { ReaderCongfig } from "./interfaces";
import { MmrDataStoreService } from "./mmr-data-store.service";

/**
 * 参数读取器
 */
export interface ArgumentReader {
    get(cfg: ReaderCongfig): any
}


export class PageArgumentReader implements ArgumentReader {
    constructor(private snapshot: ActivatedRouteSnapshot) {}

    get(cfg: ReaderCongfig) {
        switch (cfg.from) {
            case 'path':
                return this.snapshot.paramMap.get(cfg.name)
            // case 'query': 默认是 query
        }        
        return this.snapshot.queryParamMap.get(cfg.name)
    }
}


export class ScriptArgumentReader implements ArgumentReader {
    constructor(
        private snapshot: ActivatedRouteSnapshot,
        private dataService: MmrDataStoreService
    ) {}

    get(cfg: ReaderCongfig) {
        if (cfg.script != null) {
            return (function ($cfg, $snapshot, $dataservice) { return eval($cfg.script) }(
                cfg, this.snapshot, this.dataService
            ))
        }
        return null
    }
}

export class ValueArgumentReader implements ArgumentReader {
    get(cfg: ReaderCongfig) {
        return cfg.value
    }
}


export class DataStoreArgumentReader implements ArgumentReader {
    constructor(
        private dataService: MmrDataStoreService
    ) {}

    get(cfg: ReaderCongfig) {
       if (cfg.from != null) {
           const ds = this.dataService.getDataStoreManager().lookupDataStore(cfg.from);
           if (ds != null) {
               return ds.getOne().get(cfg.attrName || cfg.name)
           }
       }
       else {
           console.warn('未指定要查找的数据源')
       }
    }
}
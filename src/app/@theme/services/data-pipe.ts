import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {of as observableOf} from 'rxjs/observable/of';
import { DataPipeConfig } from "./interfaces";
import { MmrDataStoreService } from "./mmr-data-store.service";


  
/** 
 * 数据处理器
 */
export interface DataPipe {
    translate(data: any) : Observable<any>;
}

export function createDataPipe(config: DataPipeConfig, dataStoreService: MmrDataStoreService): DataPipe {
    const cfg = config || {name:'----'}

    if (cfg.name == 'SimpleDataPipe') {
        return new SimpleDataPipe(config, dataStoreService);
    }

    throw new Error("Unsupported DataPie");
}


export class SimpleDataPipe implements DataPipe {
   
    constructor(
        public config: DataPipeConfig, 
        public dataStoreService: MmrDataStoreService){}

    translate(data: any) : Observable<any> {
        const first =  this.process(data);
        if (this.config.next) {
            const next = createDataPipe(this.config.next, this.dataStoreService);
            return first.map(d => next.translate(d));
        }
        return first;
    }

    process(data: any): Observable<any> {
        return observableOf(data);
    }
}

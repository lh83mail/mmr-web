import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {of as observableOf} from 'rxjs/observable/of';
import { DataStoreService } from "./data-store.service";
import { DataPipeConfig } from "./interfaces";


  
/** 
 * 数据处理器
 */
export interface DataPipe {
    translate(data: any) : Observable<any>;
}

export function createDataPipe(config: DataPipeConfig, dataStoreService: DataStoreService): DataPipe {
    const cfg = config || {name:'----'}

    if (cfg.name == 'SimpleDataPipe') {
        return new SimpleDataPipe(config, dataStoreService);
    }

    throw new Error("Unsupported DataPie");
}


export class SimpleDataPipe implements DataPipe {
   
    constructor(
        public config: DataPipeConfig, 
        public dataStoreService: DataStoreService){}

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

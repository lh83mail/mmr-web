import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";

export interface MmrModel {
    id: string;
    attributes: {
        [key: string]: MmrAttribute
    }
}

export interface MmrAttribute {
    id: string;
    valueType: ValueType;
    isSet?: boolean;
    value?: any;
    desc?: string;
    valueOptions?: DateValueOptions | NumberValueType ;
}

export interface DateValueOptions {
    format: string;
}

export interface NumberValueType {
    digits: number
}

export enum ValueType {
    STRING,
    INT,
    DATE,
}


export enum DataStoeType {
    LOCAL,
    REMOTE,
}

export interface DataStore {
    id: string;
    dsType: DataStoeType;
    model: MmrModel;
    isSet?: boolean;
    data?: any;
    associates?: {
        [key:string]: any
    };
    associateStores?: Array<DataStore>;
}

/**
 * 数据仓库管理器
 *
 */
export class DataStoreManager {
    private stores:  {[key: string]: DataStore};
    /**
     * 根据配置创建数据仓库管理器实例
     *    配置格式： { [key:string]: DataStore }
     *    配置项：
     *      key: 数据仓库名称
     *      value： DataStore配置
     * @param options
     */
    static createManager(options: {[key: string]: DataStore}): DataStoreManager {
        if (options == null) {
            return null;
        }

        const manager = new DataStoreManager();
        manager.stores = options;
        return manager;
    }

    lookupDataStore(dsName: any): DataStore {

        function find(stores: Array<DataStore>): DataStore {
            for (let i = 0; i < stores.length; i++) {
                if (dsName == stores[i].id) {
                    return stores[i];
                }
                if (stores[i].associateStores != null) {
                    const s = find(stores[i].associateStores)
                    if (s != null) {
                        return s
                    }
                }
            }
            return null
        }

        const storeArray = []
        for (let key in this.stores) {
            storeArray.push(this.stores[key])
        }
        return find(storeArray)
    }

    getDataStores(): {[key: string]: DataStore} {
        return this.stores;
    }

}


export class DataStoreExecutor {
    constructor(private ds:DataStore){}

    createNew(): Observable<DataStore> {
        return null
    }

    load(params: any): Observable<DataStore> {
        return null
    }



}
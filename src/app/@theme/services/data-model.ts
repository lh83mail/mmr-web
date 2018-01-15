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
        return this.stores[dsName];
    }
}

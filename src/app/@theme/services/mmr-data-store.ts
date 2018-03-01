import { DataStoreConfig } from './data-model'
import {  MmrDataStoreService } from './interfaces'


export interface MmrValueAccessable  {
    applyValues(ds: DataStore)
    updateValues(ds: DataStore)
}
  
export function instanceOfMmrValueAccessable(object: any): object is MmrValueAccessable {
return 'applyValues' in object && 'updateValues' in object;
}
  
export class DataStore {
    private _refs = []
    private _data:any
    private _substores:Array<DataStore> = []
    private dataStroeService: MmrDataStoreService
    
    id: string = ""

    constructor(private _config: DataStoreConfig, dataStroeService: MmrDataStoreService) {
        this._data = this._config.data
        this.id = this._config.id
        this.dataStroeService = dataStroeService

        if (this._config.associateStores) {
            this._config.associateStores.forEach(cfg => {
                this.addSubStore(new DataStore(cfg, dataStroeService))
            })
        }
    }

    /**
     * 加载数据
     */
    load(params) {
        this.dataStroeService.execute({
            type: 'remote',
            command: 'load_purchase_order',
            args: {
                method: 'POST',
                params: params
            }
        })  
        .subscribe(response => {
            this.set(response.data)
        })
    }

    /**
     * 落实数据
     */
    commit() {

    }

    /**
     * 数据是否被修改过
     */
    isDirty() {

    }


    get config(): DataStoreConfig {
        return this._config
    }
    
    /**
     * 
     * @param data 
     * @param byWho 数据更新人是谁
     */
    set(data:any, byWho: any = null) {
        if (data != this._data) {
            this._data = data
            this.notifyDataＣhanged(byWho)
        }
    }

    get(): any {
        return this._data
    }

    addSubStore(store: DataStore) {
        this._substores.push(store)
    }

    getSubstores(): Array<DataStore> {
        return this._substores
    }
    
    notifyDataＣhanged(exceptRef) {
        for (let ref of this._refs) {
            if (ref !== exceptRef && instanceOfMmrValueAccessable(ref)) {
                (ref as MmrValueAccessable).applyValues(this)
            }
        }
    }

    bind(who:any) {
        const idx = this._refs.indexOf(who);
        if (idx < 0) {
            this._refs.push(who)
        }
    }

    unbind(who:any) {
        this._refs = this._refs.filter(ref => ref !== who)
    }
}



/**
 * 数据仓库管理器
 *
 */
export class DataStoreManager {
    private stores:  {[key: string]: DataStore} = {}
   
    /**
     * 根据配置创建数据仓库管理器实例
     *    配置格式： { [key:string]: DataStore }
     *    配置项：
     *      key: 数据仓库名称
     *      value： DataStore配置
     * @param options
     */
    static createManager(options: {[key: string]: DataStoreConfig}, dataStroeService: MmrDataStoreService): DataStoreManager {
        if (options == null) {
            return null;
        }
        const manager = new DataStoreManager()

        // function createDataStore(config: DataStoreConfig, parent: DataStore): DataStore {
        //     let s = new DataStore(config)
        //     if (parent != null) {
        //         parent.addSubStore(s)
        //     }
        //     if (config.associateStores != null) {
        //         config.associateStores.forEach(cfg => {
        //             createDataStore(cfg, s)
        //         })
        //     }
        //     return s
        // }
        for (let key in options) {
            manager.stores[key] = new DataStore(options[key], dataStroeService);// createDataStore(options[key], null)
        }
        return manager;
    }



    private constructor() {

    }

    lookupDataStore(dsName: any): DataStore {

        function find(stores: Array<DataStore>): DataStore {
            for (let i = 0; i < stores.length; i++) {
                if (dsName == stores[i].id) {
                    return stores[i];
                }
                if (stores[i].getSubstores() != null) {
                    const s = find(stores[i].getSubstores())
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
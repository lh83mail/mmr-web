import { MmrDataStoreConfig, MmrModel, MmrAttribute } from './data-model'
import {  MmrDataStoreService, Command, CommandResponse } from './interfaces'
import { isArray, isFunction } from 'util';
import { Subject } from 'rxjs/Subject';
import { EventEmitter } from '@angular/core';
import { MmrEvent } from './mmr-event-bus';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import {of as observableOf} from 'rxjs/observable/of'

export interface MmrValueAccessable  {
    applyValues(ds: MmrDataStore)
    updateValues(ds: MmrDataStore)
}
  
export function instanceOfMmrValueAccessable(object: any): object is MmrValueAccessable {
return 'applyValues' in object && 'updateValues' in object;
}

export class MmrRecord {
    model: MmrModel
    data: {
        [name:string] : any
    }

    constructor(_model: MmrModel, _data: any) {
        this.model = _model;
        this.data = _data || {}
    }
 
    get(attrName:string): any {
        return this.data[attrName]
    }

    set(attrName: string, value: any) {
        this.data[attrName] = value
    }
}

// export class Event {

// }

class MmrData {
    data: any;
    status?:number;
    message?:string;
    totalRecord?:number;
    pageSize?:number;
    start?: number;
    page?: number;
    totalPage?:number;
    [name: string]: any;
}

  
export class MmrDataStore {
    private _refs = []
    private _records: Array<MmrRecord> = []
    private _substores:Array<MmrDataStore> = []
    private dataStroeService: MmrDataStoreService

    private totalRecord?:number = 0
    private pageSize?:number = 20
    private start?: number = 0


    recordsChanged: EventEmitter<MmrEvent> = new EventEmitter<MmrEvent>()
    

    /**
     * 记录集ID
     */
    id: string = ""

    constructor(private _config: MmrDataStoreConfig, dataStroeService: MmrDataStoreService) {
    
        this.id = this._config.id
        this.dataStroeService = dataStroeService
        this.updateRecords(this._config.data, this)

        if (this._config.associateStores) {
            this._config.associateStores.forEach(cfg => {
                this.addSubStore(new MmrDataStore(cfg, dataStroeService))
            })
        }
    }

    private applyMmrData(data: MmrData) {
        const record = data.data || []

        const arr = isArray(record) ? record : [record]
        arr.forEach( d => this._records.push(new MmrRecord(this._config.model, d)))
        
        this.start = data.start || 0
        this.pageSize = data.pageSize || 20
        this.totalRecord = data.totalPage || arr.length        
    }

    private updateRecords(data: any | any , source: any) {
        data = data || new MmrData()
        if (data instanceof MmrData || data.data != null) {
           this.applyMmrData(data)
        }else {
            var r = new MmrData()
            r.data = data
            this.applyMmrData(r)
        }

        this.recordsChanged.emit({source: source, data: this._records})
    }

    /** 
     * 清空记录集
     */
    empty() {
        this._records = []
    }

    /**
     * 读取配置
     */
    get config(): MmrDataStoreConfig {
        return this._config
    }

    /**
     * 
     * @param 更新数据 data 
     * @param byWho 数据更新人是谁
     */
    set(data:any | Array<any>, byWho: any = null) {
        this.empty()
        this.updateRecords(data, byWho)
    }

    /** 
     * 获取所有数据记录
     */
    get(): Array<MmrRecord> {
        return this._records
    }

    getFirst() : MmrRecord {
        return this._records.length > 0 ? this._records[0] : null
    }

    addSubStore(store: MmrDataStore) {
        this._substores.push(store)
    }

    getSubstores(): Array<MmrDataStore> {
        return this._substores
    }

    getCommand(name: string): Command {
        if (this._config.commands == null) return null
        var cmd = this._config.commands[name]
        return cmd  
    }

    load() {
        const cmd = this.getCommand('load')
        if (cmd) {
           this.dataStroeService.execute(cmd)
            .subscribe(response => {
                this.set(response.data, this)            
            }) 
            return           
        }
        throw new Error("command Not Found")
    }
    
}



/**
 * 数据仓库管理器
 *
 */
export class DataStoreManager {
    private stores:  {[key: string]: MmrDataStore} = {}
   
    /**
     * 根据配置创建数据仓库管理器实例
     *    配置格式： { [key:string]: DataStore }
     *    配置项：
     *      key: 数据仓库名称
     *      value： DataStore配置
     * @param options
     */
    static createManager(options: {[key: string]: MmrDataStoreConfig}, dataStroeService: MmrDataStoreService): DataStoreManager {
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
            manager.stores[key] = new MmrDataStore(options[key], dataStroeService);// createDataStore(options[key], null)
        }
        return manager;
    }



    private constructor() {

    }

    lookupDataStore(dsName: any): MmrDataStore {

        function find(stores: Array<MmrDataStore>): MmrDataStore {
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

    getDataStores(): {[key: string]: MmrDataStore} {
        return this.stores;
    }

}
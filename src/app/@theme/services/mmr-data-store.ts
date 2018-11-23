import { MmrDataStoreConfig, MmrAttribute} from './data-model'
import { Command } from './interfaces'
import { EventEmitter } from '@angular/core';
import { MmrEvent } from './mmr-event-bus';
import { MmrDataStoreService } from './mmr-data-store.service';
import { isArray } from 'util';

export interface MmrValueAccessable  {
    applyValues(ds: MmrDataStore)
    updateValues(ds: MmrDataStore)
}
  
export function instanceOfMmrValueAccessable(object: any): object is MmrValueAccessable {
return 'applyValues' in object && 'updateValues' in object;
}

export class Value {
    constructor(private rawValue: any) {}

    set(value) {
        this.rawValue = value;
    }

    get():any {
        return this.rawValue
    }    
}

/**
 * 数据集
 */
export class MmrDataSet {
    /**
     * 数据集唯一标识
     */
    id: string;

    /**
     * 记录集合
     */
    records?: Array<MmrRecord>;


    create(rawData: Array<any>) {

    }

    
}

/**
 * 数据集合变化对象
 */
export class DataStoreChange {
    constructor(
        public store: MmrDataStore,    
        public newValue: MmrRecord = null,
        public oldValue: MmrRecord = null) {}    
}

export class MmrRecord {
    /**
     * 记录在DataStore数据集合中的序号
     */
    index: number = -1;
    
    /**
     * 脏数据
     */
    dirty: boolean;
    
    /**
     * 记录实际数据
     */
    data: {
        [name:string] : any
    }

    constructor(_data: any) {
        this.data = _data || {}
    }
    
    /**
     * 获取指定的数据
     * @param attrName 
     */
    get(attrName:string): any {
        return this.data[attrName]
    }

    /**
     * 设置数据
     * @param attrName 
     * @param value 
     */
    set(attrName: string, value: any) {
        this.data[attrName] = value
    }
}

  
export class MmrDataStore {
    /**
     * 当前数据集合
     */
    private _records: Array<MmrRecord> = []
    /**
     * 记录ID
     */
    private _lastIndex: number = 0;

    /**
     * 已经被删除的数据集
     */
    private _deletedRecords: Array<MmrRecord> = []
    private dataStroeService: MmrDataStoreService

    recordsChanged: EventEmitter<MmrEvent> = new EventEmitter<MmrEvent>()
    
    
    constructor(private config: MmrDataStoreConfig, dataStroeService: MmrDataStoreService) {        
        this.dataStroeService = dataStroeService
    }

    /**
     * DataStore的ID
     */
    get id () {
        return this.config.id
    }

    getKeys(): Array<MmrAttribute> {
      return  this.config.attributes.filter(a => a.primary === true)
    }

    /**
     * 重置记录集
     */
    private reset() {
        this._records = [];
        this._deletedRecords = [];
        this._lastIndex = 0
    }

    /**
     * 加载数据记录
     * @param data 要加载的数据集合
     * @param append 是否追加到数据集
     */
    load(data: any, append: boolean = false) {
        console.log('load of MmrDataStore called', data)
        const dataset = data || []

        if (append !== true) {
            this.reset();
        }

        const arr = (dataset && typeof dataset.pop === 'function' ) ? dataset : [dataset]
        arr.forEach( data => {
            var record = new MmrRecord(data)
            record.index = this._lastIndex++
            record.dirty = append === true
            this._records.push(record)

            console.log('record changes from MmrDataStore')
            this.recordsChanged.emit({
                source: this, 
                data: new DataStoreChange(this, record)
            })
        })
    }

    /**
     * 追加新数据到记录中
     * @param data 
     */
    append(data: any) {
        const dataset = data.data || []
        const arr = isArray(dataset) ? dataset : [dataset]
        arr.forEach( data => {
            var record = new MmrRecord(data)
            record.index = this._lastIndex++
            record.dirty = true
            this._records.push(record)
 
            this.recordsChanged.emit({
                source: this, 
                data: new DataStoreChange(this, record)
            })
        })
    }

    /**
     * 删除数据
     * @param data 
     */
    remove(data: any) {

    }


    removeByKey(keys: {[name:string]: any}): void {
        const removedRecord = []
        const other = []
        this._records.forEach(rec => {
            if (this.matches(keys, rec)) {
                removedRecord.push(rec)
            }
            else {
                other.push(rec)
            }
        })

        if (removedRecord.length > 0) {
            this._records = other;
        }
    }

    matches(keys: { [name: string]: any; }, rec: MmrRecord): any {
        let match = 0
        for (let p in keys) {
             match += (rec.get(p) == keys[p])? 1: 0
        }
        return match == keys.keys().length
    }


    /**
     * 加载远程数据
     */
    loadRemoteData(args: any) {        
       this.dataStroeService.createCommandExecutor({
            type: 'http',
            command: 'load-remote-data',
            args: {
                method: 'GET',
                params: args
            }
        })
        .execute()
        .subscribe(d => this.load(d.data))
    }

    
    /** 
     * 清空记录集
     */
    empty() {
        //TODO 待实现这个方法
    }

    /** 
     * 获取所有数据记录
     */
    get(): Array<MmrRecord> {
        return this._records
    }

    getOne() : MmrRecord {
        return this._records.length > 0 ? this._records[0] : null
    }

    getCommand(name: string): Command {
        // if (this._config.commands == null) return null
        // var cmd = this._config.commands[name]
        return {}  as Command;
    }
    
    /**
     * 提交数据改变
     */
    commit() {
        const cmd = this.getCommand('commit')
        
        if (cmd) {
           this.dataStroeService.execute(cmd);
            // .subscribe(response => {
            //     this.set(response.data, this)            
            // }) 
            return           
        }
        // throw new Error("undefined command")
    }    
}



/**
 * 数据仓库管理器
 *
 */
export class DataStoreManager {
    private _stores:  {[key: string]: MmrDataStore} = {}
    
    /**
     * 根据配置创建数据仓库管理器实例
     *    配置格式： { [key:string]: DataStore }
     *    配置项：
     *      key: 数据仓库名称
     *      value： DataStore配置
     * @param options
     */
    static createManager(options: Array<MmrDataStoreConfig>, dataStroeService: MmrDataStoreService): DataStoreManager {
        const manager = new DataStoreManager()

        if (options == null) {
            return manager;
        }
        
        options.forEach(o => {
            manager.addStore(new MmrDataStore(o, dataStroeService))                    
        })

        return manager;
    }

    recordsChanged: EventEmitter<MmrEvent> = new EventEmitter<MmrEvent>()

    addStore(store: MmrDataStore) {
        this._stores[store.id] = store;
        store.recordsChanged.subscribe(evt => {
            console.log('record changes from DataStoreManager')
            this.recordsChanged.emit(evt)
        })
    }


    private constructor() {

    }

    lookupDataStore(dsName: any): MmrDataStore {

        function find(stores: Array<MmrDataStore>): MmrDataStore {
            for (let i = 0; i < stores.length; i++) {
                if (dsName == stores[i].id) {
                    return stores[i];
                }
            }
            return null
        }

        const storeArray = []
        for (let key in this._stores) {
            storeArray.push(this._stores[key])
        }
        return find(storeArray)
    }

    getDataStores(): {[key: string]: MmrDataStore} {
        return this._stores || {};
    }

}
import { MmrDataStoreConfig, MmrAttribute} from './data-model'
import { Command } from './interfaces'
import { isArray } from 'util';
import { EventEmitter } from '@angular/core';
import { MmrEvent } from './mmr-event-bus';
import { MmrDataStoreService } from './mmr-data-store.service';

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
        public oldValue?: MmrRecord,
        public newValue?: MmrRecord) {}    
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
        this.updateRecords(this.config.data, this)
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

    private applyMmrData(data: any) {
        const record = data.data || []
        this._records = []
        const arr = isArray(record) ? record : [record]
        arr.forEach( d => this._records.push(new MmrRecord(d)))    
    }

    updateRecords(data: any , source: any) {
        this.applyMmrData(data)
        this.recordsChanged.emit({source: source, data: this._records})
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
        const dataset = data.data || []

        if (append !== true) {
            this.reset();
        }

        const arr = isArray(dataset) ? dataset : [dataset]
        arr.forEach( data => {
            var record = new MmrRecord(data)
            record.index = this._lastIndex++
            record.dirty = append === true
            this._records.push(record)

            this.recordsChanged.emit({
                source: this, 
                data: new DataStoreChange(this, null, record)
            })
        })
    }

    //TODO 实现其它数据集合处理方法

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
        .subscribe(d => this.updateRecords(d, this))
    }

    /**
     * 添加记录
     * @param record 
     */
    append(...record: Array<MmrRecord>) {

    }

    /**
     * 删除记录
     * @param record
     */
    remove(record: MmrRecord) {

    }

    
    /** 
     * 清空记录集
     */
    empty() {
        this.updateRecords(null, this)
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
            manager._stores[o.id] = new MmrDataStore(o, dataStroeService);            
        })

        return manager;
    }

    recordsChanged: EventEmitter<MmrEvent> = new EventEmitter<MmrEvent>()

    addStore(store: MmrDataStore) {
        this._stores[store.id] = store;
        // store.recordsChanged.pipe(recordsChanged)
    }

    onStoreRecordChanged(event: MmrEvent): any {
        
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
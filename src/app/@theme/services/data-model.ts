import { Observer } from "rxjs/Observer";
import { Observable } from "rxjs/Observable";
import { ReaderCongfig, Command } from "./interfaces";


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


export enum DataStroeType {
    LOCAL,
    REMOTE,
}

export interface MmrDataStoreConfig {
    id: string;
    dsType: DataStroeType;
    isSet?: boolean;
    data?: any;
    arguments?: Array<ReaderCongfig>;
    associateStores?: Array<MmrDataStoreConfig>;
    attributes: Array<MmrAttribute>;
}


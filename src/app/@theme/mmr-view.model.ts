import { MmrAttribute } from './services';


interface AttributeView {
    editor: string;
    name: string;
}

export interface MmrViewOption {
    type: string;
    [key: string]: any;
}

export interface MmrFilterField extends MmrAttribute, MmrViewOption {}
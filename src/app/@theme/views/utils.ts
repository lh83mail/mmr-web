import { ValueType } from '../services';

const editorMap = {};
editorMap[ValueType.STRING] = 'input';
editorMap[ValueType.INT] = 'input';

export function getEditor(valueType: ValueType): string {
    return editorMap[valueType];
}


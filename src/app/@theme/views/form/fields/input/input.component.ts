import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MmrAttribute, ValueType, DateValueOptions, NumberValueType, MmrValueAccessable} from '../../../../services';
import { MmrViewOption } from '../../../../mmr-view.model';
import { DataStore } from '../../../..';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, MmrAttribute, MmrViewOption, MmrValueAccessable {

 
  @Input() type: string;
  @Input() formGroup: FormGroup;
  @Input() value: any;
  @Input() id: string;
  @Input() valueType: ValueType;
  @Input() isSet?: boolean;
  @Input() desc?: string;
  @Input() valueOptions?: DateValueOptions | NumberValueType;

  private control

  constructor() { }

  ngOnInit() {
    this.control = new FormControl(this.value)
    // if (this.formGroup == null) {
    //   this.formGroup = new FormGroup({});
    // }
    this.formGroup.setControl(this.id, this.control);
  }

  private _value: ValueRef;

  applyValues(ds: DataStore) {
   if (ds.id == 'ds0' && ds.data != null) {
      this.value = ds.data[this.id]
      this.control.setValue(this.value)

     // datastore bind(new Value(this.value, this, this.id, (val) => this._value = val))
   }
  }
  updateValues(ds: DataStore) {
    if (ds.id == 'ds0') {
      ds.data = ds.data || {}
      ds.data[this.id] = this.control.value
    }
  }
}

const refs= {}

function bind(value: ValueRef) {
  const ref = refs[value.id] || []
  ref.push(value)
  refs[value.id] = ref
}

class ValueRef {
  private _val
   _source
   id
   updater:(Value)=>void

  constructor(val, source, _id, _updater) {
    this._val = val
    this._source = source
    this.id = _id
    this.updater = _updater
  }

  set value(val) {
    this._val = val
    const ref = refs[this.id] || []  // 这里需要考虑排除重复的值，减少不必要的循环，？？是否需要排队防止提交冲突
    ref.forEach(element => {
      if (element._source !== this._source) {
        this.updater(new ValueRef(val, element._source, element.id, element.updater)) /** id, updater原始updater */
      }
    });
  }

  get value() {
    return this._val
  }
}
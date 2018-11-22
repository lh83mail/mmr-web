import { Component, OnInit, Input, SimpleChanges, OnChanges, ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MmrAttribute, ValueType, DateValueOptions, NumberValueType, MmrDataStoreService, MmrComponentRef, EditorComponent, ViewComponent, SupportExpression } from '../../../../services';
import { MmrViewOption } from '../../../../mmr-view.model';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, MmrAttribute, MmrViewOption, EditorComponent, OnChanges {

  @SupportExpression()
  type:string = 'input'
  description?: string;
  layout: string;
  items?: ViewComponent[];

  @Input() xtype: string;

  @Input() formGroup: FormGroup;

  @SupportExpression()
  @Input() value: any;
  
  @Input() id: string;
  @Input() valueType: ValueType;
  @Input() isSet?: boolean;
  @Input() desc?: string;
  @Input() valueOptions?: DateValueOptions | NumberValueType;
  @Input() binddingTarget: string;

  control:FormControl

  constructor(
    private mmrComponentRef: MmrComponentRef,
    private dataStoreService: MmrDataStoreService
  ) { }

  ngOnInit() {
    this.control = new FormControl(this.value)
    if (this.formGroup == null) {
      this.formGroup = new FormGroup({});
    }
    if (this.formGroup != null){
      this.formGroup.setControl(this.id, this.control);
    }
    
    this.control.valueChanges.subscribe(v => {
      // this.dataStoreService.updateValue(this.id, this.binddingTarget, v)
      this.dataStoreService.notifyDataChanged(this.id, 'value', v)      
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on-input-cccc', changes)  
  }

  // TODO 响应数据集合改变
  // recordChanges(changes: RecordChanges ): void {
  //     // this.expression.properties.each {
  //     //   if (changes.contains(prop.name)) {
  //     //     this[prop.name] = prop.expression.exec()
  //     //   }
  //     // }
  // }
  // private _value: ValueRef;
}

// const refs= {}

// function bind(value: ValueRef) {
//   const ref = refs[value.id] || []
//   ref.push(value)
//   refs[value.id] = ref
// }

// class ValueRef {
//   private _val
//    _source
//    id
//    updater:(Value)=>void

//   constructor(val, source, _id, _updater) {
//     this._val = val
//     this._source = source
//     this.id = _id
//     this.updater = _updater
//   }

//   set value(val) {
//     this._val = val
//     const ref = refs[this.id] || []  // 这里需要考虑排除重复的值，减少不必要的循环，？？是否需要排队防止提交冲突
//     ref.forEach(element => {
//       if (element._source !== this._source) {
//         this.updater(new ValueRef(val, element._source, element.id, element.updater)) /** id, updater原始updater */
//       }
//     });
//   }

//   get value() {
//     return this._val
//   }
// }
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MmrAttribute, ValueType, DateValueOptions, NumberValueType } from '../../../../services';
import { MmrViewOption } from '../../../../mmr-view.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, MmrAttribute, MmrViewOption {

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

}

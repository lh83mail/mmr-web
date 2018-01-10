import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() children:Array<any>;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { 
    console.log('ffff', this.children)
  }

  ngOnInit() {
    this.formGroup = this.fb.group({}) 
    this.children.forEach(e => {
      e.formGroup = this.formGroup
    })
  }

  toFormGroup() {

  }

  submit() {
    console.log('form-vlaues', this.formGroup.value)
  }

  load() {}
}

import {Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { MMRViewComponents } from '../mmr-view.component';
import { MMRComponent } from 'app/@theme/mmr.component';
import { MMRDirective, MMRLoadViewDirective } from 'app/@theme/mmr.directive';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() children: Array<any>;
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) {
    // super()
  }

  ngOnInit() {
    this.formGroup = this.fb.group({});
    this.children.forEach(e => {
      e.formGroup = this.formGroup;
    });
  }

  toFormGroup() {

  }

  submit() {
    console.log('form-vlaues', this.formGroup.value);
  }

  load() {}
}

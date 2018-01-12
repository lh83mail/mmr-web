import {Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { MMRViewComponents } from '../mmr-view.component';
import { MMRComponent } from 'app/@theme/mmr.component';
import { MMRDirective, MMRLoadViewDirective } from 'app/@theme/mmr.directive';
import { MmrDataStoreService } from 'app/@theme/services';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Input() children: Array<any>;
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dataStoreService: MmrDataStoreService
  ) {
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
    this.dataStoreService.execute({
      command: 'submit-form',
      args: {
        data: this.formGroup.value
      }
    }, this)
    .then(response => {
      console.log('submited', response);
    });
  }

  load() {}
}

import {Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import { MMRDirective, MMRLoadViewDirective } from 'app/@theme/mmr.directive';
import { MmrDataStoreService, DataStore } from 'app/@theme/services';
import 'rxjs/add/operator/toPromise';
import { DataStoreConfig, MmrValueAccessable } from '../..';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, MmrValueAccessable {
  @Input() children: Array<any>;
  formGroup: FormGroup;
  dsName;

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

    this.formGroup.valueChanges.subscribe(v => {
      console.log('values', v)
      const ds = this.dataStoreService.getDataStoreManager().lookupDataStore(this.dsName);
      if (ds != null) {
         ds.set(v, this)
      }
    })

    const ds = this.dataStoreService.getDataStoreManager().lookupDataStore(this.dsName);
    if (ds != null) {
      ds.bind(this)
    }
  }

  toFormGroup() {

  }

  submit() {
    this.dataStoreService.execute({
      command: 'submit-form',
      args: {
        body: this.formGroup.value
      }
    })
    .toPromise()
    .then(response => {
      console.log('submited', response);
      if (response.status === 200) {
        this.formGroup.setValue(response.data);
      }
    });
  }


  load() {}


  applyValues(ds: DataStore) {
    if (ds.id == this.dsName) {
    //  ds.bind(this)
      this.formGroup.patchValue(ds.get(), {emitEvent:false})      
    }
  }

  updateValues(ds: DataStore) {
     if (ds.id == this.dsName) {
       ds.set(this.formGroup.value, this)
     }
  }
}

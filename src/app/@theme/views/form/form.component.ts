import {Component, Input, OnInit, ViewChild, ViewChildren} from '@angular/core';
import { FormGroup } from '@angular/forms/src/model';
import { FormBuilder } from '@angular/forms';
import {  MmrDataStore, MmrDataStoreService, ViewComponent } from 'app/@theme/services';
import 'rxjs/add/operator/toPromise';
import { AbstractView } from '../AbstractView';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent extends AbstractView  {
  formGroup: FormGroup;
  items: Array<ViewComponent>;

  constructor(
    private fb: FormBuilder,
    protected dataStoreService: MmrDataStoreService
  ) {
     super(dataStoreService)
  }

  ngOnInit() {
    super.ngOnInit()

    this.formGroup = this.fb.group({});
    this.items.forEach(e => {
      (<any>e).formGroup = this.formGroup;
    });

    this.formGroup.valueChanges.subscribe(v => {
      const ds = this.dataStoreService.getDataStoreManager().lookupDataStore(this.dsName);
      if (ds != null) {
         ds.set(v, this)
      }
    })
  }

  toFormGroup() {

  }

  submit() {
    // this.dataStoreService.execute({
    //   type: 'remote',
    //   command: 'submit-form',
    //   args: {
    //     body: this.formGroup.value
    //   }
    // })
    // .toPromise()
    // .then(response => {
    //   console.log('submited', response);
    //   if (response.status === 200) {
    //     this.formGroup.setValue(response.data);
    //   }
    // });
  }


  load() {}


  applyValuesIfMatch(ds: MmrDataStore) {
    if (ds.id == this.dsName) {
      const r = ds.getOne()
      if (r != null) {
        this.formGroup.patchValue(r.data, {emitEvent:false})   
      }         
    }
  }

  updateValuesIfMatch(ds: MmrDataStore) {
     if (ds.id == this.dsName) {
       ds.set(this.formGroup.value, this)
     }
  }
}

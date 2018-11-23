import { Component, OnInit, NgZone, ViewChildren, ComponentRef, ElementRef, ViewContainerRef, ComponentFactoryResolver, ViewRef, QueryList, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import {  MmrConfiguration, RootView, MmrComponentRef, Command, MmrDataStore } from '../../..';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MmrAbstractPage } from '../../MmrAbstractPage'
import { MMRLoadViewDirective } from '../../../mmr.directive';
import { PageArgumentReader, ScriptArgumentReader } from '../../../services/arguments-reader';
import { Application } from '../../../../@core';
import { MmrDataStoreService } from 'app/@theme/services/mmr-data-store.service';


@Component({
  selector: 'app-master-details-form',
  //templateUrl: './master-details-form.component.html',
  template: '<div *ngFor="let option of __viewConfig?.children" mmrLoadView [options]="option"></div>',
  styleUrls: ['./master-details-form.component.css'],
  providers: [
    MmrDataStoreService
  ]
})
export class MasterDetailsFormComponent extends MmrAbstractPage implements OnInit, AfterViewInit{

  @ViewChildren(MMRLoadViewDirective) __mmrViews: QueryList<MMRLoadViewDirective>;   

    constructor(
      protected ngZone: NgZone,
      protected route: ActivatedRoute,
      protected router: Router,
      protected dataStoreService: MmrDataStoreService,
      protected mmrConfiguration: MmrConfiguration,
      protected application: Application,
      private _ref: ElementRef,
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver,
    ) {
      super(ngZone, route, router, dataStoreService, mmrConfiguration, application)
    }

    ngOnInit() {}

   ngAfterViewInit(): void {
    const stores:{[key: string]: MmrDataStore} = this.dataStoreService.getDataStoreManager().getDataStores() || {}
    
    if (stores == null) {
      return;
    }

    for (const key in stores) {
      const ds = stores[key]
      // ds.filter()
    }    
   }

  createData(ds: MmrDataStore): any {
    return {}
  }
  
  finish() {
    const stores:{[key: string]: MmrDataStore } = this.dataStoreService.getDataStoreManager().getDataStores() || {}
    for (const key in stores) {
      const data = this.createData(stores[key])
      console.log('save-data', stores[key].get())
    }
  }
}
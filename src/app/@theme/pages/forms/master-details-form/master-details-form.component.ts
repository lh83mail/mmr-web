import { Component, OnInit, NgZone, ViewChildren, ComponentRef, ElementRef, ViewContainerRef, ComponentFactoryResolver, ViewRef, QueryList, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { MmrDataStoreService, DataStoreService, MmrConfiguration, RootView, MmrComponentRef, Command, DataStoreConfig, DataStore } from '../../..';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MmrAbstractPage } from '../../MmrAbstractPage'
import { MMRLoadViewDirective } from '../../../mmr.directive';


@Component({
  selector: 'app-master-details-form',
  //templateUrl: './master-details-form.component.html',
  template: '<div *ngFor="let option of __viewConfig?.children" #dxxxx  mmrLoadView [options]="option"></div>',
  styleUrls: ['./master-details-form.component.css'],
  providers: [
    {
      provide: MmrDataStoreService, useClass: DataStoreService
    }
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
      private _ref: ElementRef,
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver,
    ) {
      super(ngZone, route, router, dataStoreService, mmrConfiguration)
    }


    mmrViewConfigLoaded() {
      super.mmrViewConfigLoaded()
      const stores:{[key: string]: DataStore} = this.dataStoreService.getDataStoreManager().getDataStores() || {}
      for (const key in stores) {
        const ds = stores[key]
        var as = ds.config.associates || []
        var params = {}
        as.forEach(param => {
          params[param] = this.route.snapshot.queryParamMap.get(param)
        });
        ds.load(params)
      }
    }

    ngOnInit() {}

  ngAfterViewInit(): void {

    // if (this.isNewForm()) {
    //   this.createNewFrom();
    //   // this.dataStoreService.execute({
    //   //   command: 'from-master-detail-create', args: {
    //   //     method: "GET"
    //   //   }
    //   // }, this)
    //   // .subscribe(response => {
    //   //     this.__mmrViews.forEach(v => {
    //   //       const ds = this.dataStoreService.getDataStoreManager().lookupDataStore("ds0");
    //   //       ds.data = response.data
    //   //       v.mmrComponentRef.applyValues(ds)
    //   //     })
    //   // })
    // }
    // // 加载就的数据
    // else {
    //   this.dataStoreService.execute({
    //     command: 'form-master-detail-load', args: {
    //       method: "GET",
    //       params: {
    //         id: '0001'
    //       }
    //     }
    //   }, this)
    //   .subscribe(response => {
    //     this.__mmrViews.forEach(v => {
    //       const ds = this.dataStoreService.getDataStoreManager().lookupDataStore("ds0");
    //       ds.set(response.data)
    //        v.mmrComponentRef.applyValues(ds)
    //     })
    //   })
    // }
    
   }

  createNewFrom() {
    const stores:{[key: string]: DataStore} = this.dataStoreService.getDataStoreManager().getDataStores() || {}
    for (const key in stores) {
      const ds = stores[key]
      // ds.load()

      this.__mmrViews.forEach(v => {
        this.dataStoreService.execute({
          command: 'from-master-detail-create',
          args: {
            method: "GET",
            params: {
              "viewId": this.__viewId
            }
          }
        }, this)
        .subscribe(response => {
          ds.set(response.data)
         // this.applyData(ds, response.data);
         // v.mmrComponentRef.applyValues(ds)
        })
      })
    }
  }

  // applyData(ds: DataStore, data: any) {
  //   ds.data = data
  //   if (ds.associateStores != null && data && data['substores'] != null) {
  //     ds.associateStores.forEach(substore => {
  //       this.applyData(substore, data['substores'][substore.id])
  //     })
  //   }
  // }

  createData(ds: DataStore): any {
    return {}
  }

  finish() {
 
    const stores:{[key: string]: DataStore } = this.dataStoreService.getDataStoreManager().getDataStores() || {}
    for (const key in stores) {
      // this.__mmrViews.forEach(v => {
      //   v.mmrComponentRef.readValues(stores[key])
      // })

      const data = this.createData(stores[key])
      console.log('save-data', stores[key].get())
    }
  }

  /**
   * 探测是否为新建表单
   */
  isNewForm(): boolean {
    return true;
  }

  createInitlizedCommand(ds: DataStore): Command {
    return {
      command: 'from-master-detail-create', args: {
        method: "GET"
      }
    }
  }
  
}
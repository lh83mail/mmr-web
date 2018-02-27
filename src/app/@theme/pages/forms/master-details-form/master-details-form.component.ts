import { Component, OnInit, NgZone, ViewChildren, ComponentRef, ElementRef, ViewContainerRef, ComponentFactoryResolver, ViewRef, QueryList, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { MmrDataStoreService, DataStoreService, MmrConfiguration, RootView, MmrComponentRef, Command, DataStore } from '../../..';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MmrAbstractPage } from '../../MmrAbstractPage'
import { MMRLoadViewDirective } from '../../../mmr.directive';

class Data {
  constructor(private _name){}

  
  set name(val) {
    this._name = val
  }

  get name() {
    return this._name
  }
}

@Component({
  selector: 'app-master-details-form',
  //templateUrl: './master-details-form.component.html',
  template: ' <input  [(ngModel)]="testv.name" /> {{testv.name}} <div *ngFor="let option of __viewConfig?.children" #dxxxx  mmrLoadView [options]="option"></div>',
  styleUrls: ['./master-details-form.component.css'],
  providers: [
    {
      provide: MmrDataStoreService, useClass: DataStoreService
    }
  ]
})
export class MasterDetailsFormComponent extends MmrAbstractPage implements OnInit, AfterViewInit{

  private testv = new Data("Hello")

  @ViewChildren(MMRLoadViewDirective) __mmrViews: QueryList<MMRLoadViewDirective>;
    

    constructor(
      private _ngZone: NgZone,
      private route: ActivatedRoute,
      private router: Router,
      private dataStoreService: MmrDataStoreService,
      private mmrConfiguration: MmrConfiguration,
      private _ref: ElementRef,
      private viewContainerRef: ViewContainerRef,
      private cfr: ComponentFactoryResolver,
    ) {
      super(_ngZone, route, router, dataStoreService, mmrConfiguration)

      this.route.params.subscribe(params => {
        
      })
    }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

    if (this.isNewForm()) {
      this.createNewFrom();
      // this.dataStoreService.execute({
      //   command: 'from-master-detail-create', args: {
      //     method: "GET"
      //   }
      // }, this)
      // .subscribe(response => {
      //     this.__mmrViews.forEach(v => {
      //       const ds = this.dataStoreService.getDataStoreManager().lookupDataStore("ds0");
      //       ds.data = response.data
      //       v.mmrComponentRef.applyValues(ds)
      //     })
      // })
    }
    // 加载就的数据
    else {
      this.dataStoreService.execute({
        command: 'form-master-detail-load', args: {
          method: "GET",
          params: {
            id: '0001'
          }
        }
      }, this)
      .subscribe(response => {
        this.__mmrViews.forEach(v => {
          const ds = this.dataStoreService.getDataStoreManager().lookupDataStore("ds0");
          ds.data = response.data
          v.mmrComponentRef.applyValues(ds)
        })
      })
    }
   }

  createNewFrom() {
    const stores:{[key: string]: DataStore} = this.dataStoreService.getDataStoreManager().getDataStores() || {}
    for (const key in stores) {
      const ds = stores[key]
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
          this.applyData(ds, response.data);
          v.mmrComponentRef.applyValues(ds)
        })
      })
    }
  }

  applyData(ds: DataStore, data: any) {
    ds.data = data
    if (ds.associateStores != null && data && data['substores'] != null) {
      ds.associateStores.forEach(substore => {
        this.applyData(substore, data['substores'][substore.id])
      })
    }
  }

  createData(ds: DataStore): any {
    return {}
  }

  finish() {
 
    const stores:{[key: string]: DataStore} = this.dataStoreService.getDataStoreManager().getDataStores() || {}
    for (const key in stores) {
      this.__mmrViews.forEach(v => {
        v.mmrComponentRef.readValues(stores[key])
      })

      const data = this.createData(stores[key])
      console.log('save-data', stores[key].data)
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
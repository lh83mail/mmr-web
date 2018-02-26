import { Component, OnInit, NgZone, ViewChildren } from '@angular/core';
import { MmrDataStoreService, DataStoreService, MmrConfiguration, RootView } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MMRLoadViewDirective } from '../mmr.directive';

const empyFun = ()=>{}

export abstract class MmrAbstractPage {
    protected __viewId: string      // 页面ID
    protected __viewConfig: any     // 页面配置数据
    
    @ViewChildren(MMRLoadViewDirective) __mmcl;

    constructor(
       protected __ngZone: NgZone,
       protected __route: ActivatedRoute,
       protected __router: Router,
       protected __dataStoreService: MmrDataStoreService,
       protected __mmrConfiguration: MmrConfiguration,
    ) {
        this.__route.paramMap.subscribe(paramMap => {
            this.__viewId = paramMap.get('id')
            this.mmrPageLoad(this.__viewId)
        })

    }

    /**
     * 页面加载开始
     * @param viewId 
     */
    mmrPageLoad(viewId: string) {
        this.__dataStoreService.setupViewId(viewId, new MmrRootView(
            this.__dataStoreService, this
          ))
      
        this.__dataStoreService.loadView(this.__viewId)
            .toPromise()
            .then(
              cfg => {
                this.__viewConfig = cfg
                this.mmrViewConfigLoaded()
              }
          )
    }

    /**
     * 页面配置加载完成后
     */
    mmrViewConfigLoaded = empyFun


    navigateView(viewId: string) {
        const command = ['views'];
        command.push(viewId);
        this.__router.navigate(command);
    }
}

class MmrRootView implements RootView {
    constructor(private dataStoreService: MmrDataStoreService, private view: MmrAbstractPage) { }
    loadView(viewId: string) {
      this.view.navigateView(viewId);
    }
}
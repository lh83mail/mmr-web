import { Component, OnInit, NgZone, ViewChildren } from '@angular/core';
import { MmrConfiguration, RootView } from '../services';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, PageEvent } from '@angular/material';
import { MMRLoadViewDirective } from '../mmr.directive';
import { Command, DataStoreManager, MmrDataStore } from '..';
import { Application, AppState } from '../../@core';
import { Action } from '../services/cmd/cmd-excutors';
import { MmrDataStoreService } from '../services/mmr-data-store.service';


const empyFun = ()=>{}

export abstract class MmrAbstractPage {
    protected __viewId: string      // 页面ID
    protected __viewConfig: any     // 页面配置数据
    
    @ViewChildren(MMRLoadViewDirective) __mmcl;
    constructor(
       protected ngZone: NgZone,
       protected route: ActivatedRoute,
       protected router: Router,
       protected dataStoreService: MmrDataStoreService,
       protected mmrConfiguration: MmrConfiguration,
       protected application: Application,
    ) {
        this.route.paramMap.subscribe(paramMap => {
            this.__viewId = paramMap.get('id')
            this.mmrPageLoad(this.__viewId)
        })    
    }
    /**
     * 页面加载开始
     * @param viewId 
     */
    mmrPageLoad(viewId: string) {
        this.dataStoreService.setupViewId(viewId, new MmrRootView(
            this.dataStoreService, this
        ))

        this.dataStoreService.loadView(this.__viewId)
            .toPromise()
            .then(
              cfg => {
                this.__viewConfig = cfg
                // this.dataStoreService.setUpDataStore(cfg.dataStores);
                this.mmrViewConfigLoaded()
              }
          )
    }

    /**
     * 页面配置加载完成后
     */
    mmrViewConfigLoaded(){}

    navigateView(viewId: string) {
        const command = ['views'];
        command.push(viewId);
        this.router.navigate(command);
    }

    findAction(path:string) : Action {
        return null
    }
}

class MmrRootView implements RootView {
    constructor(private dataStoreService: MmrDataStoreService, private view: MmrAbstractPage) { }
    loadView(viewId: string) {
      this.view.navigateView(viewId);
    }
}
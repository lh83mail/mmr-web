import { NgModule, NgZone, ViewChildren, Component, OnInit, AfterViewInit } from '@angular/core';
import { RootView, PageConfig, ViewDataManager, MmrDataStoreService } from 'app/@theme/services';
import { MMRLoadViewDirective } from 'app/@theme/mmr.directive';
import { ActivatedRoute, Router } from '@angular/router'
import { MmrConfiguration, DataStoreManager } from 'app/@theme';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'mmr-view',
  templateUrl: './mmr-view.component.html',
  providers: [
    MmrDataStoreService
  ]
})
export class MmrViewComponent {
  viewId: string;
  config: PageConfig;

  @ViewChildren(MMRLoadViewDirective) __mmcl;

  constructor(
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private dataStoreService: MmrDataStoreService,
    private mmrConfiguration: MmrConfiguration,
  ) {
    this.route.paramMap.subscribe(paramMap => {
      const viewId = paramMap.get('id');
      this.initView(viewId);
    })
  }

  initView(viewId: string) {
    this.viewId = viewId;
    this.dataStoreService.setupViewId(this.viewId, new MmrRootView(
      this.dataStoreService, this
    ));
    this.dataStoreService.loadView(viewId)
      .toPromise()
      .then(d => {
        this.config = d;
        // this.dataStoreService.loadData()
        // FIXME 处理数据加载问题
        this.runInitAction()
      });
  }

  /**
   * 页面生命周期:执行页面初始化
   */
  runInitAction() {
    if (this.config == null) {
      throw new Error("config should not be null")
    }    
  }

  navigateView(viewId: string) {
    const command = ['views'];
    // if (this.route.snapshot.data.next !== '') {
    //   command.push(this.route.snapshot.data.next);
    // }
    command.push(viewId);
    this.router.navigate(command);
  }

  donave() {
  

  }
}

class MmrRootView implements RootView {
  constructor(private dataStoreService: MmrDataStoreService, private view: MmrViewComponent) { }
  loadView(viewId: string) {
    this.view.navigateView(viewId);
  }
}
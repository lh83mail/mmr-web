import { NgModule, NgZone, ViewChildren, Component } from '@angular/core';
import { MmrDataStoreService, DataStoreService, RootView } from 'app/@theme/services';
import { MMRLoadViewDirective } from 'app/@theme/mmr.directive';
import { ActivatedRoute, Router } from '@angular/router'
import { MmrConfiguration, DataStoreManager } from 'app/@theme';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'mmr-view',
  templateUrl: './mmr-view.component.html',
  providers: [
    {
      provide: MmrDataStoreService, useClass: DataStoreService
    }
  ]
})
export class MmrViewComponent {

  viewJson: any;

  @ViewChildren(MMRLoadViewDirective) __mmcl;

  viewId: string;
  dataSotreManager: DataStoreManager;

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
        this.viewJson = d
        // this.dataSotreManager = DataStoreManager.createManager(this.viewJson.dataStores)
        // this.dataStoreService.setDataStoreManager(this.dataSotreManager);
        this.dataStoreService.setUpDataStore(this.viewJson.dataStores)
        this.runInitAction()
      });
  }

  /**
   * 页面生命周期:执行页面初始化
   */
  runInitAction() {
    if (this.viewJson && this.viewJson.runtime) {

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
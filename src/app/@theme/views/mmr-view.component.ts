import { NgModule, NgZone, ViewChildren, Component } from '@angular/core';
import { MmrDataStoreService, DataStoreService, RootView } from 'app/@theme/services';
import { MMRLoadViewDirective } from 'app/@theme/mmr.directive';
import { ActivatedRoute, Router } from '@angular/router'

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

  constructor(
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private dataStoreService: MmrDataStoreService,
  ) {
    this.route.paramMap.subscribe(paramMap => {
      const viewId = paramMap.get('id');
      this.initView(viewId);
    })
  }


  ngOnInit() {

  }

  initView(viewId: string) {
    this.viewId = viewId;
    this.dataStoreService.setupViewId(this.viewId, new MmrRootView(
      this.dataStoreService, this
    ));
    this.dataStoreService.loadView(viewId)
      .then(d => this.viewJson = d);
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
    console.log('xxx');
  }
}

class MmrRootView implements RootView {
  constructor(private dataStoreService: MmrDataStoreService, private view: MmrViewComponent) { }
  loadView(viewId: string) {
    this.view.navigateView(viewId);
  }
}
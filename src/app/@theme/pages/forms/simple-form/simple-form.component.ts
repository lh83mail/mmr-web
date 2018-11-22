import { Component, OnInit, NgZone } from '@angular/core';
import {   MmrConfiguration, RootView } from '../../..';
import { ActivatedRoute, Router } from '@angular/router';
import { MmrDataStoreService } from 'app/@theme/services/mmr-data-store.service';
import { PageConfig } from 'app/@theme/services';

@Component({
  selector: 'app-simple-form',
  templateUrl: './simple-form.component.html',
  styleUrls: ['./simple-form.component.css'],
  providers: [
    MmrDataStoreService
  ]
})
export class SimpleFormComponent implements OnInit {
  protected  viewId: string
  viewConfig: PageConfig;

  constructor(
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private dataStoreService: MmrDataStoreService,
    private mmrConfiguration: MmrConfiguration,
  ) {
   
    this.route.paramMap.subscribe(paramMap => {
      this.viewId = paramMap.get('id')
      this.initView(this.viewId)
    })
  }

  initView(viewId: any): any {
    this.dataStoreService.setupViewId(viewId, new MmrRootView(
      this.dataStoreService, this
    ))

    this.dataStoreService.loadView(this.viewId)
      .toPromise()
      .then(
        cfg => {
          this.viewConfig = cfg
          this.dataStoreService.loadData(this.route.snapshot.queryParams)
        }
      )
  }

  saveData() {
    this.dataStoreService.getDataStoreManager()
      .lookupDataStore('primary')
      .commit()
  }


  ngOnInit() {
     
  }

  creeateNewData() {

  }

  loadData() {

  }


  navigateView(viewId: string) {
    const command = ['views'];
    // if (this.route.snapshot.data.next !== '') {
    //   command.push(this.route.snapshot.data.next);
    // }
    command.push(viewId);

    this.router.navigate(command);
  }

}

class MmrRootView implements RootView {
  constructor(private dataStoreService: MmrDataStoreService, private view: SimpleFormComponent) { }
  loadView(viewId: string) {
    this.view.navigateView(viewId);
  }
}

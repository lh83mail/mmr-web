import { AfterContentInit, AfterViewInit, Component, NgZone, OnInit, QueryList, ViewChildren, ComponentRef, Injectable } from '@angular/core';
import { DataStoreService } from '../../@theme/services';
import { ActivatedRoute, Router } from '@angular/router';
import { MmrDataStoreService, RootView } from '../../@theme/services/interfaces';
import { MMRLoadViewDirective } from 'app/@theme/mmr.directive';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: MmrDataStoreService, useClass: DataStoreService
    }
  ]
})
export class HomeComponent implements OnInit {

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
    this.dataStoreService.setupViewId(this.viewId, new HomeRootView(
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

class HomeRootView implements RootView {
  constructor(private dataStoreService: MmrDataStoreService, private view: HomeComponent) { }
  loadView(viewId: string) {
    this.view.navigateView(viewId);
  }

}


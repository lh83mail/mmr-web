import {AfterContentInit, AfterViewInit, Component, NgZone, OnInit, QueryList, ViewChildren} from '@angular/core';
import {MMRComponent} from "../../@theme/mmr.component";
import {DataStoreService} from "../../@theme/services/data-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageStateService} from "../../@theme/services/page-state.service";
import {MmrDataStoreService, RootView} from "../../@theme/services/interfaces";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    PageStateService,
    {
      provide: MmrDataStoreService, useClass: DataStoreService
    }
  ]
})
export class HomeComponent implements OnInit {

  viewJson:any;

  @ViewChildren("viewRoot") viewRoot: QueryList<MMRComponent>;

  viewId:string;

  constructor(
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private dataStoreService: MmrDataStoreService,
    private pageState: PageStateService,
  ) {
    const viewId = this.route.snapshot.paramMap.get('id');
    this.loadComponents(viewId);
  }


  ngOnInit() {
    
  }

  loadComponents(viewId:string) {
    this.viewId = viewId;
    this.pageState.setViewId(this.viewId, this);
    this.dataStoreService.setupViewId(this.viewId, new HomeRootView(
      this.dataStoreService, this
    ));
    this.dataStoreService.loadView(viewId)
      .then(d => this.viewJson = d);
  }

  navigateView(viewId: string) {
    const command = ['views']
    if (this.route.snapshot.data.next != '') {
      command.push(this.route.snapshot.data.next);
    }
    command.push(viewId);

    this.router.navigate(command)
  }

  donave() {
    console.log('xxx', this.viewRoot)
  }

}

class HomeRootView implements RootView {
  constructor(private dataStoreService: MmrDataStoreService, private view: HomeComponent) {}
  loadView(viewId: string) {
    this.view.navigateView(viewId);
  }

}

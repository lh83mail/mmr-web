import {AfterContentInit, AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {DataObjectService} from "../../services/data-object.service";
import {MMRComponent} from "../../@theme/mmr.component";
import {DataStoreService} from "../../@theme/services/data-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PageStateService} from "../../@theme/services/page-state.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    PageStateService
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, AfterContentInit {

  viewJson:any;

  @ViewChildren("viewRoot") viewRoot: QueryList<MMRComponent>;

  viewId:string;

  constructor(
    private route: ActivatedRoute,
    private dataStoreService: DataStoreService,
    private pageState: PageStateService,
  ) {
    this.viewId = this.route.snapshot.paramMap.get('id');
    this.pageState.setViewId(this.viewId, this);
  }


  ngOnInit() {
    console.log('here 8')
    this.dataStoreService.loadView(this.viewId)
      .then( d => {
        this.viewJson = d
      })

  }

  ngAfterViewInit(): void {
    console.log('here 9')
  }


  ngAfterContentInit(): void {
    console.log('here 10')
    this.dataStoreService.initPage(this.viewId);

  }
}

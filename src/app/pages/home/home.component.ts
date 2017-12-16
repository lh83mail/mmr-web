import {Component, OnInit, QueryList,  ViewChildren} from '@angular/core';
import {DataObjectService} from "../../services/data-object.service";
import {MMRComponent} from "../../@theme/mmr.component";
import {DataStoreService} from "../../@theme/services/data-store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  viewJson:any;

  @ViewChildren("viewRoot") viewRoot: QueryList<MMRComponent>;

  viewId:string;

  constructor(
    private route: ActivatedRoute,
    private dataStoreService: DataStoreService
  ) {
    this.viewId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit() {

    this.dataStoreService.loadView(this.viewId)
      .then( d => this.viewJson = d );
  }

}

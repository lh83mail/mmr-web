import {Component, OnInit, QueryList,  ViewChildren} from '@angular/core';
import {DataObjectService} from "../../services/data-object.service";
import {MMRComponent} from "../../@theme/mmr.component";
import {DataStoreService} from "../../@theme/services/data-store.service";
import {ActivatedRouteSnapshot} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  viewJson:any;

  @ViewChildren("viewRoot") viewRoot: QueryList<MMRComponent>;

  constructor(
   private route: ActivatedRouteSnapshot,
    private dataObjectService : DataObjectService,
    private dataStoreService: DataStoreService
  ) {
  //  console.log('viewid', this.route.paramMap.get('viewId'))
  }


  ngOnInit() {
    this.dataObjectService.execute(
      { viewId: 'table-view', command: 'load-view-config'}
    )
    .then( d => this.viewJson = d );
      // .then( () => this.initViewData())  // 执行数据初始化
  }

  /**
   * 初始化数据
   */
  initViewData() {

    this.dataObjectService.execute({
      command: 'init-data',
      viewId: 'table-view'
    })
      .then(d => {
         // todo 初始化主题数据
         //  DataStore, 视图子组件监听DataStore相应事件，取出关心的数据更新自己
        this.dataStoreService.initData('table-view');
      })
  }

}

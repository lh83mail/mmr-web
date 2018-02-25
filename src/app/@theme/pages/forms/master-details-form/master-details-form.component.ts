import { Component, OnInit, NgZone } from '@angular/core';
import { MmrDataStoreService, DataStoreService, MmrConfiguration, RootView } from '../../..';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource, PageEvent } from '@angular/material';

@Component({
  selector: 'app-master-details-form',
  templateUrl: './master-details-form.component.html',
  styleUrls: ['./master-details-form.component.css'],
  providers: [
    {
      provide: MmrDataStoreService, useClass: DataStoreService
    }
  ]
})
export class MasterDetailsFormComponent implements OnInit {
  protected  viewId: string
  viewConfig: any;

    // ----------grid ---------------
    private columns;
    private dataSource: MatTableDataSource<any[]>;
    private displayColumns: Array<String>;
  
    private isLoading: boolean;
  
    // 用于分页
    private total = 0;
    private pageSize = 20;
    private pageOptions = [15, 20, 50, 100];
    private pageEvent: PageEvent;

    

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
        }
      )
  }

  /**
   * 初始化表格
   */
  setupDetails() {
    this.columns = [
      { name: 'id', text: 'ID'},
      { name: 'name', text: '规格编码'},
      { name: 'col2', text: '货品名称'},
      { name: 'col3', text: '简称'},
      { name: 'col4', text: '规格'},
      { name: 'col5', text: '数量'},
      { name: 'col6', text: '实际单价'},
      { name: 'col7', text: '小计'},
      { name: 'col8', text: '可用库存'},
      { name: 'col9', text: '备注'}
    ];
    this.displayColumns = this.columns.map(c => c.name);
    this.dataSource = new MatTableDataSource()
  }

  ngOnInit() {

    if (this.isNewForm()) {
      //  this.dataStoreService.execute({command: 'create-user-form', args: {
      //     method: "GET"
      //  }}, this)
      //   .subscribe(response => {
      //       console.log('response', response)
      //   })
    }

    this.setupDetails();
  }

  /**
   * 探测是否为新建表单
   */
  isNewForm(): boolean {
    return true;
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
  constructor(private dataStoreService: MmrDataStoreService, private view: MasterDetailsFormComponent) { }
  loadView(viewId: string) {
    this.view.navigateView(viewId);
  }
}
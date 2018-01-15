import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/of';
import {MmrDataStoreService} from '../../services/interfaces';
import { viewClassName } from '@angular/compiler';
import { DataStore } from 'app/@theme';
import {MatSort, MatButton} from '@angular/material';
import { MatTableDataSource } from './table-data-source';
import { AfterContentInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  dsName: string;
  columns: Array<any>;
  runtime: any;
  
  __dataSource__: MatTableDataSource<any>;
  __displayedColumns__;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private dataStoreService: MmrDataStoreService,
  ) {}

  /**
   * 初始化UI
   */
  initView() {
    this.__displayedColumns__ = this.columns.map(c => c.name);
    const ds: DataStore = this.dataStoreService.getDataStoreManager().lookupDataStore(this.dsName);

    this.columns.forEach(c => {
      const attr = ds.model.attributes[c.name];
      c.text = c.text || attr.desc || c.name;
    });
  }
 
  ngOnInit() {
    this.initView();

    if (this.runtime && this.runtime.init) {
       this.dataStoreService.execute(this.runtime.init, this).then(response => {
          this.__dataSource__ = new MatTableDataSource(response.data.data || []);
          this.__dataSource__.sort = this.sort;
        })
    }
  }

  /**
   * 加载数据
   */
  loadData() {
    this.dataStoreService.execute({command: 'load-data'}, this)
      .then(res => this.__dataSource__ = new MatTableDataSource(res.data));
  }


  
  ngAfterViewInit() {
    console.log(this.sort)
  }
}

export class ExampleDataSource extends DataSource<any> {

  constructor(private data: any) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}


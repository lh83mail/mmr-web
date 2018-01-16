import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {MmrDataStoreService} from '../../services/interfaces';
import { viewClassName } from '@angular/compiler';
import { DataStore } from 'app/@theme';
import {MatSort, MatButton, PageEvent, MatPaginator} from '@angular/material';
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
  pageable: boolean | PageOption

  // 用于分页
  __enable_pagtion__: boolean;
  __total__ = 0;
  __pageEvent__: PageEvent;
  __pageOptions__: any;

  __dataSource__: MatTableDataSource<any>;
  __displayedColumns__;

  __isLoading__: boolean;

  @ViewChild(MatSort) __sort__: MatSort;
  @ViewChild(MatPaginator) paginator;

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

    //
    this.__setupPageable();
  }


  ngOnInit() {
    this.initView();

    if (this.runtime && this.runtime.init) {
       this.dataStoreService.execute(this.runtime.init, this)
       .toPromise()
       .then(response => {
          this.__dataSource__ = new MatTableDataSource(response.data.data || []);
          this.__dataSource__.sort = this.__sort__;
        })
    }
  }

  /**
   * 加载数据
   */
  loadData() {
    this.dataStoreService.execute({command: 'load-data'}, this)
    .toPromise()
      .then(res => this.__dataSource__ = new MatTableDataSource(res.data));
  }

  ngAfterViewInit() {

    // 排序改变时重设置页码
    this.__sort__.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
    });

    merge(this.__sort__.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.__isLoading__ = true;
          return this.dataStoreService.execute(this.runtime.init, this);
        })
      )
      .map(cmdResponse => {

      });
  }


  /**
   * 配置分页
   */
  __setupPageable() {
    if (this.pageable) {
      this.__enable_pagtion__ =  true;
      const tmp = {
        pageSize: 15,
        pageSizeOptions : [5, 15, 25, 100]
      }

      if (typeof this.pageable === 'object') {
        tmp.pageSize = this.pageable.pageSize || 15;
        const opts = this.pageable.pageSizeOptions;
        if (opts) {
          if (typeof opts === 'string') {
            tmp.pageSizeOptions = opts.split(',').map(o => parseInt(o, 10))
          } else {
            tmp.pageSizeOptions = opts;
          }
        }
      }

      this.__pageOptions__ = tmp;
    }
  }

}

export class ExampleDataSource extends DataSource<any> {

  constructor(private data: any) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return observableOf(this.data);
  }

  disconnect() {}
}


export interface PageOption {
  pageSize?: number;
  pageSizeOptions?: string | Array<number>;
}
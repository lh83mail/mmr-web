import { Component, OnInit, ViewChild } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {MmrDataStoreService, ValueType, CommandResponse} from '../../services';
import {MmrAttribute, DataStoreConfig } from '../../services';
import { viewClassName } from '@angular/compiler';
import {MatSort, MatButton, PageEvent, MatPaginator} from '@angular/material';
import { MatTableDataSource } from './table-data-source';
import { AfterContentInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { MmrFilterField } from '../../mmr-view.model'
import { MMRComponetRegisty } from '../../mmr.service';
import { getEditor } from '../utils';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { DataStore } from '../..';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('shrinkOut', [
      state('in', style({height: '*'})),
      transition('void => *', [
        style({height: 0}),
        animate(250)
      ]),
      transition('* => void', [
        style({height: '*'}),
        animate(250, style({height: 0}))
      ])
    ])
  ]
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

  __dataSource__: MatTableDataSource<any[]> = new MatTableDataSource();
  __displayedColumns__;

  // 视图状态
  __isLoading__: boolean;
  __enableQuickFilterBar__: boolean;
  __moreFilterExpanded__: boolean;

  // 过滤条件
  private quickerFilterFields: Array<MmrFilterField>;
  private filterFields: Array<MmrFilterField>;

  @ViewChild(MatSort) __sort__: MatSort;
  @ViewChild(MatPaginator) paginator;


  private ds: DataStore;

  /**
   * 过滤条件改变后数据
   */
  filterChanges: EventEmitter<any> = new EventEmitter<any>();
  filterValues: any;

  filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dataStoreService: MmrDataStoreService
  ) {}

  /**
   * 初始化UI
   */
  initView() {
    this.__displayedColumns__ = this.columns.map(c => c.name);

    this.ds = this.dataStoreService.getDataStoreManager().lookupDataStore(this.dsName);

    this.columns.forEach(c => {
      c.text = c.text || this.getAttribute(c.name)!.desc || c.name;
    });

    //
    this.setupPageable();
    this.setupFilterView();
  }

  private getAttribute(name: string): MmrAttribute {
    const attr = this.ds.config.model.attributes[name];
    return attr;
  }


  ngOnInit() {
    this.initView();
  }

  ngAfterViewInit() {

    // 排序改变时重设置页码
    this.__sort__.sortChange.subscribe(() => {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
    });

    let obs = null;
    if (this.pageable) {
      obs = merge(this.__sort__.sortChange,
        this.paginator.page,
        this.filterChanges
      );
    } else {
      obs = merge(
        this.__sort__.sortChange,
        this.filterChanges
      );
    }

    obs.pipe(
        startWith({}),
        switchMap(() => {
          this.__isLoading__ = true;

          const args = Object.assign(this.runtime.init.args || {}, {
            'sort': this.__sort__.active,
            'direction': this.__sort__.direction,
            'pageIndex': this.paginator == null ? 0 : this.paginator.pageIndex
          }, this.filterValues );
          this.runtime.init.args = args;

          return this.dataStoreService.execute(this.runtime.init, this);
        }),
        map<CommandResponse, any>(cmdResponse => {
          this.__isLoading__ = false;
          if (this.paginator) {
            this.paginator.length = cmdResponse.data.total || 0;
          }
          return cmdResponse.data.data;
        })
      )
      .subscribe(data => {
        this.__dataSource__.data = data;
      })
  }

  /**
   * 展开／关闭高级过滤
   */
  toggleAdvanceFilter() {
    this.__moreFilterExpanded__ = !this.__moreFilterExpanded__;
  }

  /**
   * 配置分页
   */
  private setupPageable() {
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


  /**
   * 设置过滤条件界面
   */
  private setupFilterView() {

    this.quickerFilterFields   = new Array<MmrFilterField>();
    this.filterForm = this.formBuilder.group({});
    const quickFilterForm = this.formBuilder.group({});
    this.filterValues = {};

    this.filterFields = this.columns
    .filter(c => (c.quickFilter === true || c.filterable === true))
    .map(c => {
      const attr = this.getAttribute(c.name);
      if (attr == null) {
        return null;
      }

      const field =  this.resloveEditor(attr);
      field.desc = c.text || field.desc;
      field.formGroup = this.filterForm;

      this.filterValues[field.id] = field.value;

      if (c.quickFilter) {
        const qfield = Object.assign({}, field);
        qfield.formGroup = quickFilterForm;
        this.quickerFilterFields.push(qfield);
      }
      return field;
    });

    quickFilterForm.valueChanges.subscribe(values => {
      this.filterValues = values;
      this.filterChanges.emit(values);
    })

    this.__enableQuickFilterBar__ = this.quickerFilterFields.length > 0;
  }

  private resloveEditor(attr: MmrAttribute): MmrFilterField {
   return  {
      id: attr.id,
      type: getEditor(attr.valueType),
      valueType:  attr.valueType,
      desc: attr.desc,
      value: attr.value,
    };
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


// interface FilterView {
//   name: string;
//   valueType: ValueType;
//   value: any;
// }


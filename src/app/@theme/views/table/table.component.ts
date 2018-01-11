import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import 'rxjs/add/observable/of';
import {MmrDataStoreService} from '../../services/interfaces';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource: DataSource<any> | null;
  displayedColumns;
  columns: Array<any>;

  runtime: any;

  constructor(
    private dataStoreService: MmrDataStoreService,
  ) {
  }

  ngOnInit() {
    console.log('here 7');
    this.displayedColumns = this.columns.map(c => c.name);

    if (this.runtime && this.runtime.init) {
      this.dataStoreService.execute(this.runtime.init)
        .then(response => {
          this.dataSource = new ExampleDataSource(response.data.data);
        })
      ;
    }
  }

  /**
   * 加载数据
   */
  loadData() {
    this.dataStoreService.execute({command: 'load-data'})
      .then(res => this.dataSource = new ExampleDataSource(res.data));
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


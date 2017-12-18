import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {DataSource} from "@angular/cdk/collections";
import "rxjs/add/observable/of"
import {CommandService} from "../../services/CommandService";
import {DataStoreService} from "../../services/data-store.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource: DataSource<any> | null;
  displayedColumns;
  columns:Array<any>;

  constructor(
    private dataStoreService: DataStoreService,
    private commandService: CommandService
  ) {

    this.dataStoreService.onDataInit.subscribe(data => {
      console.log(">>>>InTable>>>>", data);
      this.dataSource = new ExampleDataSource(data);
    });
  }

  ngOnInit() {
    this.displayedColumns = this.columns.map(c => c.name);
  }


  onCommandExecute(command, data) {

  }
}

export class ExampleDataSource extends DataSource<any> {

  constructor(private data:any) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return Observable.of(this.data);
  }

  disconnect() {}
}
``

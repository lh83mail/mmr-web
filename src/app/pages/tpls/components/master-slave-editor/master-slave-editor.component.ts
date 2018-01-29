import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, PageEvent } from '@angular/material';

@Component({
  selector: 'app-master-slave-editor',
  templateUrl: './master-slave-editor.component.html',
  styleUrls: ['./master-slave-editor.component.css']
})
export class MasterSlaveEditorComponent implements OnInit {
  private columns;
  private dataSource: MatTableDataSource<any[]>;
  private displayColumns: Array<String>;

  private isLoading: boolean;

  // 用于分页
  private total = 0;
  private pageSize = 20;
  private pageOptions = [15, 20, 50, 100];
  private pageEvent: PageEvent;
  
  constructor() {

    this.columns = [
      { name: 'id', text: 'ID'},
      { name: 'name', text: '姓名'},
    ];
    this.displayColumns = this.columns.map(c => c.name);
    this.dataSource = new MatTableDataSource()
   }

  ngOnInit() {

  }

}

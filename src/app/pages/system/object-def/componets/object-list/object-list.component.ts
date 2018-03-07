import { Component, OnInit, Inject } from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Element } from '@angular/compiler';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MASTER_DETAILS_FROM } from '../../../../../@theme/services/mock/data';


@Component({
  selector: 'app-object-list',
  templateUrl: './object-list.component.html',
  styleUrls: ['./object-list.component.css']
})
export class ObjectListComponent implements OnInit {
  displayedColumns = ['id', 'desc','id_'];
  dataSource:MatTableDataSource<Element>

  editing = false
  id:string
  config: string

  constructor(private httpClient: HttpClient,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(httpClient);
    
    
  }

  ngOnInit(): void {
    this.load()
    console.log(JSON.stringify(MASTER_DETAILS_FROM))
  }

  createNew() {
    this.id = null
    this.config = null
    this.editing = true
  }

  cancel() {
    this.editing = false
  }

  open(id) {
    this.router.navigateByUrl(`/forms/mdf/${id}`)
  }

  edit(id) {
    this.httpClient.get(`/api/v1/views/${id}/config`, 
    {
      observe: 'response',
    }
  )
  .subscribe(response => {
    this.editing = true
    if (response.body != null) {
      this.id = response.body['id']
      this.config = JSON.stringify(response.body,null, '\t')
    }
  });
  }

  delete(id) {
      let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: '300px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result !== 'yes') return;

        this.httpClient.delete(`/api/v1/views/${id}/config`, 
              {
                observe: 'response',
              }
            )
            .subscribe(response => {
              this.load()
            });
      });
  }

  save() {
    
    this.httpClient.put(`/api/v1/views/${this.id}/config`, 
      JSON.parse(this.config),
      {
        observe: 'response',
      }
    )
    .subscribe(response => {
      this.editing = false
      this.load()
    });
  }

  load() {
    return this.httpClient.get('/api/v1/views/config', 
    {
      observe: 'response',
    }
  )
  .subscribe(response => {
    if (response.body != null) {
      this.dataSource.data = response.body as Array<Element>;
    }
  });
  }
}

export class MatTableDataSource<T> extends DataSource<any> {
  filter;

  private _data = new BehaviorSubject<T[]>([])

  constructor(private httpClient: HttpClient) {
    super();
  }

  set data(data:Array<T>) {
    this._data.next(data)
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<T[]> {
    return this._data;

  }

  disconnect() {}
}

export interface Element {
  id: string;
  desc: string;
}


@Component({
  selector: 'dialog-overview-example-dialog',
  template: `
  <div>Are you Sure?</div>
  <a mat-button (click)="onNoClick()">取消</a>
  <a mat-button (click)="onYesClick()">确定</a> `, 
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick():void {
    this.dialogRef.close('yes')
  }
}
import { Component, OnInit } from '@angular/core';
import {DataObjectService} from "../../services/data-object.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  viewJson = {
    title: 'A Worker Page 777',
    children: [
      {
        type: 'card',
        title: '这里是Card主标题',
        subTitle: '这里是card的副标题',
        toolbars: [
          {
            position: 'bottom',
            children: [
              { type: 'button', text: 'LIKE' },
              { type: 'button', text: 'SHARE' },
            ]
          },
          {
            position: 'top',
            children: [
              { type: 'button', text: 'LIKE' },
              { type: 'button', text: 'SHARE' },
            ]
          }
        ],
        children: [
          {ref: '', value: 'Hello'},
          {ref: '', value: 'Hello'},
          {ref: '', value: 'Hello'},
          {ref: '', value: 'Hello'},
          {ref: '', value: 'Hello'}
        ],
        footer: {}
      }
    ]
  };

  dataObject = {};

  constructor() {


  }


  ngOnInit() {
    this.dataObject = new DataObjectService();
  }

}

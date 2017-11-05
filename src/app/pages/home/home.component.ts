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
        title: 'card-title',
        subTitle: 'card-sub-title',
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
      },
      {
        type: 'card',
        title: 'card-title',
        subTitle: 'card-sub-title',
        toolbars: [
          {
            position: 'bottom',
            children: [
              { type: 'button', text: 'Like' },
              { type: 'button', text: 'Share' },
            ]
          },
          {
            position: 'top',
            children: [
              { type: 'button', text: 'Like' },
              { type: 'button', text: 'Share' },
            ]
          }
        ],
        children: [],
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

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  viewJson = {
    title: 'A Worker Page',
    children: [
      {
        type: 'card',
        title: 'card-title',
        subTitle: 'card-sub-title',
        actions: [
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
      },
      {
        type: 'card',
        title: 'card-title',
        subTitle: 'card-sub-title',
        actions: [
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

  constructor() { }


  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import {MMRViewComponent} from "../../mmr.service";

@Component({
  selector: 'mmr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, MMRViewComponent {
  content;

  constructor() { }

  ngOnInit() {
  }


  setData(data: any) {
    console.log('>>>>' ,data)
    this.content = data;
  }
}

import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {MMRViewComponent} from "../../mmr.service";

@Component({
  selector: 'mmr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, MMRViewComponent {
  @Input() options;

  constructor(
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }


  setData(data: any) {
    this.options = data;
    this.loadComponent();
  }

  loadComponent() {

  }
}

import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {MMRViewComponent} from "../../mmr.service";

@Component({
  selector: 'mmr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title;
  @Input() subTitle;
  @Input() children;

  constructor(
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }
}

import {Component, Input, OnInit, ViewContainerRef} from '@angular/core';
import {MMRViewComponent} from "../../mmr.service";
import {PageStateService} from "../../services/page-state.service";

@Component({
  selector: 'mmr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() title;
  @Input() subTitle;
  @Input() children;
  @Input() toolbars;

  constructor(
    private pageState: PageStateService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
  }

  execute(command:string) {
    // here execute your command
    this.pageState.execute(this, command);
  }


}




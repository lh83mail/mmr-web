import {Component, Input, OnInit, ViewContainerRef, ComponentRef} from '@angular/core';
import {MMRViewComponent} from "../../mmr.service";
import {PageStateService} from "../../services/page-state.service";
import {Command, MmrDataStoreService} from "../../services/interfaces";

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
    private viewContainerRef: ViewContainerRef,
    private dataStoreService: MmrDataStoreService,
  ) { }

  ngOnInit() {
    
  }

  execute(command: Command) {
    // here execute your command
    // this.pageState.execute(this, command);
    this.dataStoreService.execute(command);
  }


}




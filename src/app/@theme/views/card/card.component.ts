import {Component, Input, OnInit, ViewContainerRef, ComponentRef, ViewChild, ViewChildren, ContentChildren} from '@angular/core';
import {MMRViewComponent} from '../../mmr.service';
import {Command, MmrDataStoreService} from '../../services/interfaces';
import { MMRDirective, MMRLoadViewDirective } from 'app/@theme/mmr.directive';
import { MatCardContent, MatCardActions } from '@angular/material';

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
    private viewContainerRef: ViewContainerRef,
    private dataStoreService: MmrDataStoreService,
  ) {

   }

  ngOnInit() {

  }
hello(e) {
  console.log('okxxxxxx', e)
}
  execute(command: Command) {
    // here execute your command
    // this.pageState.execute(this, command);
    this.dataStoreService.execute(command);
  }


}




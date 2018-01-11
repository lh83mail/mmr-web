import {Component, Input, OnInit, ViewContainerRef, ComponentRef, ViewChild, ViewChildren, ContentChildren} from '@angular/core';
import {MMRViewComponent} from '../../mmr.service';
import {Command, MmrDataStoreService} from '../../services/interfaces';
import { Query } from '@angular/core/src/metadata/di';
import { MMRComponent } from 'app/@theme/mmr.component';
import { MMRDirective, MMRLoadViewDirective } from 'app/@theme/mmr.directive';
import { MatCardContent, MatCardActions } from '@angular/material';
import { MMRViewComponents } from 'app/@theme/views/mmr-view.component';

@Component({
  selector: 'mmr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent extends MMRViewComponents implements OnInit {
  @Input() title;
  @Input() subTitle;
  @Input() children;
  @Input() toolbars;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private dataStoreService: MmrDataStoreService,
  ) {
    super();
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




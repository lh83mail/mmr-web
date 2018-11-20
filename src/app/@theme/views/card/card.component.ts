import {Component, Input, OnInit, ViewContainerRef, ComponentRef, ViewChild, ViewChildren, ContentChildren, OnChanges, SimpleChanges} from '@angular/core';
import {MMRViewComponent} from '../../mmr.service';
import {Command} from '../../services/interfaces';
import { MMRDirective, MMRLoadViewDirective } from 'app/@theme/mmr.directive';
import { MatCardContent, MatCardActions } from '@angular/material';
import { MmrDataStoreService, CardViewComponent, ViewComponent } from 'app/@theme';

@Component({
  selector: 'mmr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, CardViewComponent, OnChanges {
 
  type: string = 'card';

  @Input() title: string;
  @Input() subTitle: string;
  @Input() id: string;
  @Input() description?: string;
  @Input() toolbars?: any;
  @Input() items?: Array<ViewComponent>;
 
  layout: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private dataStoreService: MmrDataStoreService,
  ) {}

  ngOnInit() {

  }

  execute(command: Command) {
    // here execute your command
    // this.pageState.execute(this, command);
    this.dataStoreService.execute(command);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on-cccc', changes)
  }

}




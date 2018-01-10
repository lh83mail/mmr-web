import {Component, Input, OnInit, ViewContainerRef, ComponentRef, ViewChild, ViewChildren, ContentChildren} from '@angular/core';
import {MMRViewComponent} from "../../mmr.service";
import {PageStateService} from "../../services/page-state.service";
import {Command, MmrDataStoreService} from "../../services/interfaces";
import { Query } from '@angular/core/src/metadata/di';
import { MMRComponent } from 'app/@theme/mmr.component';
import { MMRDirective } from 'app/@theme/mmr.directive';
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

  @ViewChildren(MMRComponent,{read:MMRComponent}) __mmcl;

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




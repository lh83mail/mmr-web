import { Component, OnInit, Input } from '@angular/core';
import { AbstractView } from '../AbstractView';
import { DataStoreService, MmrDataStoreService } from '../../services';

@Component({
  selector: 'mmr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent extends AbstractView {
  @Input() text:string

  constructor(
    protected dataStoreService: MmrDataStoreService
  ) { 
    super(dataStoreService)
  }

  onClicked(evt) {
    let cmd = this.findCommand('click')
    if (cmd != null) {
      this.dataStoreService.execute(cmd);
    }
  }
}

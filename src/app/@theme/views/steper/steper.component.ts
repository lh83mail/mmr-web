import { Component, OnInit, Input } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Command, MmrDataStoreService } from '../../services';
import { AbstractView } from '../AbstractView';

@Component({
  selector: 'mmr-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.css']
})
export class SteperComponent extends AbstractView {

  @Input() commands: {
    [name:string] : Command
  } 

  @Input() children: Array<any>;

  constructor(
    protected dataStoreService: MmrDataStoreService
  ) {
     super(dataStoreService)
  }

  onSelectionChange(evt: StepperSelectionEvent) {
    if (this.children != null) {
      const step = this.children.find((v, idx, all) => idx == evt.selectedIndex)
      if (step && step.commands && step.commands['selected']) {
        const cmd = step.commands['selected']
        this.dataStoreService.execute(cmd)
          .subscribe()
      }
    }
  }

  nextStep() {
    console.log('do-next-step')
  }

}

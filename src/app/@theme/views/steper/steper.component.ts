import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Command, MmrDataStoreService } from '../../services';
import { AbstractView } from '../AbstractView';
import { MatStep, MatStepper } from '@angular/material';

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

  @ViewChild('stepper') steperInstance: MatStepper

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
        // this.dataStoreService.execute(cmd)
        //   .subscribe(x=>console.log(x))
      }
    }
  }

  /**
   * 进入下一标签
   */
  nextStep() {
    let cmd = this.findCommand('nextStep')
    if (cmd != null) {
      // this.dataStoreService.execute(cmd)
      //   .subscribe(r =>  {
      //     if (r.status == 200) {
      //       this.steperInstance.next()
      //     }
      //   })
    } else {
      this.steperInstance.next()
    }
  }

  /**
   * 前一标签
   */
  prevStep() {
    console.log('do-prev-step')    
    this.steperInstance.previous()
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Command, MmrDataStoreService } from '../../services';

@Component({
  selector: 'mmr-steper',
  templateUrl: './steper.component.html',
  styleUrls: ['./steper.component.css']
})
export class SteperComponent implements OnInit {

  @Input() commands: {
    [name:string] : Command
  } 

  @Input() children: Array<any>;

  constructor(
    private dataStoreService: MmrDataStoreService
  ) {
    // super()
  }

  ngOnInit() {
  }


  onSelectionChange(evt: StepperSelectionEvent) {
    if (this.children != null) {
      const step = this.children.find((v, idx, all) => idx == evt.selectedIndex)
      if (step && step.commands['selected']) {
        const cmd = step.commands['selected']
        this.dataStoreService.execute(cmd)
      }
    }
  }

}

import {CardComponent} from "app/@theme/views/card/card.component";
import {Type} from "@angular/core";

export interface MMRViewComponent {
  setOptions(options: any);
}

export class MMRComponetRegisty {

  getComponetType(type: string): any  {
     return views[type];
  }

}


const views = {
  'card': CardComponent,
}

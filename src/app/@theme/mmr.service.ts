import {CardComponent} from "app/@theme/views/card/card.component";
import {Type} from "@angular/core";

export interface MMRViewComponent {
  setData(data: any);
}

export class MMRComponetRegisty {

  getComponetType(type: string): any  {
     return CardComponent;
  }

}

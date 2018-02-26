import {CardComponent} from './views/card/card.component';
import {Type} from '@angular/core';
import {TableComponent} from './views/table/table.component';
import {FormComponent} from './views/form/form.component';
import {InputComponent} from './views/form/fields/input/input.component';
import { SteperComponent } from './views/steper/steper.component';

export interface MMRViewComponent {
  setOptions(options: any);
}

export class MMRComponetRegisty {

  getComponetType(type: string): any  {
    const views = {
      'card': CardComponent,
      'table': TableComponent,
      'form': FormComponent,
      'input': InputComponent,
      'steper': SteperComponent,
    };
     return views[type];
  }
}






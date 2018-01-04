import {NgModule} from '@angular/core';
import {
  MatSelectModule, MatToolbarModule, MatSidenavModule, MatGridListModule, MatCardModule,
  MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatTableModule
} from "@angular/material";
import {CardComponent} from "app/@theme/views/card/card.component";
import {MMRDirective} from "./mmr.directive";
import {MMRComponent} from "app/@theme/mmr.component";
import {MMRComponetRegisty} from "app/@theme/mmr.service";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import { TableComponent } from './views/table/table.component';
import { InputComponent } from './views/form/fields/input/input.component';
import {FormComponent} from "./views/form/form.component";


const components = [
  MMRComponent,
  CardComponent,
  TableComponent,
  FormComponent,
  InputComponent,
];

const directives = [
  MMRDirective,
]

@NgModule({
  declarations: [
    ...components,
    ...directives,
  ],
  imports: [
    BrowserModule,
    FormsModule,

    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,

    MatGridListModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,

    MatTableModule,

  ],
  exports: [
    ...components,
    ...directives
  ],
  providers: [
    MMRComponetRegisty,
  ],
  entryComponents: [
    ...components
  ]
})
export  class MMRModule {}

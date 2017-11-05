import {NgModule} from '@angular/core';
import {
  MatSelectModule, MatToolbarModule, MatSidenavModule, MatGridListModule, MatCardModule,
  MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule
} from "@angular/material";
import {CardComponent} from "app/@theme/views/card/card.component";
import {MMRDirective} from "./mmr.directive";
import {MMRComponent} from "app/@theme/mmr.component";
import {MMRComponetRegisty} from "app/@theme/mmr.service";


const components = [
  MMRComponent,
  CardComponent,

];

const directives = [
  MMRDirective,
]

@NgModule({
  declarations: [
    ...components,
    ...directives
  ],
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatButtonModule,

    MatGridListModule,

    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
  ],
  exports: [
    ...components,
    ...directives
  ],
  providers: [
    MMRComponetRegisty
  ],
  entryComponents: [
    ...components
  ]
})
export  class MMRModule {}

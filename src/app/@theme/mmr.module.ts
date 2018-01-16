import {NgModule} from '@angular/core';
import {
  MatSelectModule, MatToolbarModule, MatSidenavModule, MatGridListModule, MatCardModule,
  MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTooltipModule
} from '@angular/material';
import {CardComponent} from 'app/@theme/views/card/card.component';
import {MMRDirective, MMRLoadViewDirective} from './mmr.directive';
import {MMRComponetRegisty} from 'app/@theme/mmr.service';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TableComponent } from './views/table/table.component';
import { FormComponent } from 'app/@theme/views/form/form.component';
import { InputComponent } from 'app/@theme/views/form/fields/input/input.component';
import { CommonModule } from '@angular/common';
import { MmrViewComponent } from 'app/@theme/views/mmr-view.component';
import { MmrConfiguration } from 'app/@theme';

const components = [
  MmrViewComponent,

  CardComponent,
  TableComponent,

  FormComponent,
  InputComponent,
];

const directives = [
  MMRDirective,
  MMRLoadViewDirective,
];

@NgModule({
  declarations: [
    ...components,
    ...directives,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
 
    MatTooltipModule,

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
    MatSortModule,
    MatPaginatorModule,
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

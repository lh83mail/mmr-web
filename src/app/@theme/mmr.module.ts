import {NgModule} from '@angular/core';
import {
  MatSelectModule, MatToolbarModule, MatSidenavModule, MatGridListModule, MatCardModule,
  MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule, MatTableModule, MatSortModule, MatPaginatorModule, MatTooltipModule, MatStepperModule
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
import { SimpleFormComponent } from './pages/forms/simple-form/simple-form.component';
import { MasterDetailsFormComponent } from './pages/forms/master-details-form/master-details-form.component';

const components = [
  MmrViewComponent,

  CardComponent,
  TableComponent,

  FormComponent,
  InputComponent,

  // view templates
  SimpleFormComponent,
  MasterDetailsFormComponent,
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
    MatStepperModule,    

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

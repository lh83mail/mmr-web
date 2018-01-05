import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectDefRoutingModule } from './object-def-routing.module';
import { ObjectListComponent } from './componets/object-list/object-list.component';
import { ObjectDefComponent } from './object-def.component';
import {FormsModule} from '@angular/forms';
import {
  MatButtonModule, MatCardModule,
  MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatSelectModule, MatSidenavModule, MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {MMRModule} from '../../../@theme/mmr.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MMRModule,

    MatButtonModule, MatCardModule,
    MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatSelectModule, MatSidenavModule, MatTableModule,
    MatToolbarModule,

    ObjectDefRoutingModule
  ],
  declarations: [ObjectListComponent, ObjectDefComponent]
})
export class ObjectDefModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TplsRoutingModule } from './tpls-routing.module';
import { MasterSlaveEditorComponent } from './components/master-slave-editor/master-slave-editor.component';
import { TplsComponent } from './tpls.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatSelectModule,
  MatSidenavModule, MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MMRModule } from 'app/@theme/mmr.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MMRModule,

    MatTooltipModule,

    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,

    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatSlideToggleModule,

    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,

    MatListModule,  // 系统模块

    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    
    TplsRoutingModule
  ],
  declarations: [MasterSlaveEditorComponent, TplsComponent]
})
export class TplsModule { }

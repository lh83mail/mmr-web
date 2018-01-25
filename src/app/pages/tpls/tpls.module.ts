import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TplsRoutingModule } from './tpls-routing.module';
import { MasterSlaveEditorComponent } from './components/master-slave-editor/master-slave-editor.component';
import { TplsComponent } from './tpls.component';

@NgModule({
  imports: [
    CommonModule,
    TplsRoutingModule
  ],
  declarations: [MasterSlaveEditorComponent, TplsComponent]
})
export class TplsModule { }

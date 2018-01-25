import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TplsComponent } from './tpls.component';
import { MasterSlaveEditorComponent } from './components/master-slave-editor/master-slave-editor.component';

const routes: Routes = [
  {
    path: '',
    component: MasterSlaveEditorComponent,
    // children: [
    //   { path: '', redirectTo: 'object-viewer', pathMatch: 'full'},
    //   { path: 'object-viewer', component: ObjectListComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TplsRoutingModule { }

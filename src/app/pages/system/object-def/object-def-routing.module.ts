import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObjectListComponent} from './componets/object-list/object-list.component';
import {ObjectDefComponent} from './object-def.component';

const routes: Routes = [
  {
    path: '',
    component: ObjectDefComponent,
    children: [
      { path: '', redirectTo: 'object-viewer', pathMatch: 'full'},
      { path: 'object-viewer', component: ObjectListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObjectDefRoutingModule { }

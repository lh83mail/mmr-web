import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {ModulesComponent} from './pages/system/modules/modules.component';


export const MMR_ROOT_ROUTE: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', data: {}},
  {path: 'views/:id', component: HomeComponent, data: {}},
  {path: 'modules', component: ModulesComponent, data: {}},
  //{path: '', redirectTo:'dv/table-view', pathMatch: 'full', data: {}},
  //{path: 'dv/:viewId', component: HomeComponent, data: {}},
 // {path: '**', redirectTo: ''},
];


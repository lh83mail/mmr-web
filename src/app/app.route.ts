import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


export const MMR_ROOT_ROUTE: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', data: {}},
  //{path: '', redirectTo:'dv/table-view', pathMatch: 'full', data: {}},
  //{path: 'dv/:viewId', component: HomeComponent, data: {}},
  {path: '**', redirectTo: ''},
];


import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {ModulesComponent} from './pages/system/modules/modules.component';
import {EnumsMgrComponent} from './pages/system/enums-mgr/enums-mgr.component';
import {UsersMgrComponent} from './pages/system/users-mgr/users-mgr.component';
import { SimpleFormComponent } from './@theme/pages/forms/simple-form/simple-form.component';
import { MasterDetailsFormComponent } from './@theme/pages/forms/master-details-form/master-details-form.component';


export const MMR_ROOT_ROUTE: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', data: {}},
  {path: 'views/:id', component: HomeComponent },
  {path: 'modules', component: ModulesComponent, data: {}},
  {path: 'forms/mdf/:id', component: MasterDetailsFormComponent, data: {}},
  {path: 'forms/simple/:id', component: SimpleFormComponent, data: {}},
  {path: 'objects',  loadChildren: './pages/system/object-def/object-def.module#ObjectDefModule'},
  //{path: '', redirectTo:'dv/table-view', pathMatch: 'full', data: {}},
  //{path: 'dv/:viewId', component: HmeComponent, data: {}},
 // {path: '**', redirectTo: ''},
];


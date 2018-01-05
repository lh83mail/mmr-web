import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import {ModulesComponent} from './pages/system/modules/modules.component';
import {EnumsMgrComponent} from "./pages/system/enums-mgr/enums-mgr.component";
import {UsersMgrComponent} from "./pages/system/users-mgr/users-mgr.component";


export const MMR_ROOT_ROUTE: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full', data: {}},

  // 由于angular路由机制, 只改变:id参数不会产生视图组件重新创建,配置两个不同地址以触发视图的重新实例化
  {
    path: 'views',
    children: [
      {path: ':id', component: HomeComponent, data: {next: 'next'}},
      {path: 'next/:id', component: HomeComponent, data: {next: ''}}
    ]
  },

  {path: 'modules', component: ModulesComponent, data: {}},
  {path: 'enums-mgr', component: EnumsMgrComponent, data: {}},
  {path: 'users-mgr', component: UsersMgrComponent, data: {}},
  {path: 'objects',  loadChildren: './pages/system/object-def/object-def.module#ObjectDefModule'},
  //{path: '', redirectTo:'dv/table-view', pathMatch: 'full', data: {}},
  //{path: 'dv/:viewId', component: HmeComponent, data: {}},
 // {path: '**', redirectTo: ''},
];


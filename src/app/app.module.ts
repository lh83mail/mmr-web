import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {
  MatAutocompleteModule,
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatSelectModule,
  MatSidenavModule, MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {MMR_ROOT_ROUTE} from './app.route';
import {HomeComponent} from './pages/home/home.component';
import {MMRModule} from "./@theme/mmr.module";
import { ModulesComponent } from './pages/system/modules/modules.component';
import { EnumsMgrComponent } from './pages/system/enums-mgr/enums-mgr.component';
import { UsersMgrComponent } from './pages/system/users-mgr/users-mgr.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ModulesComponent,
    EnumsMgrComponent,
    UsersMgrComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MMRModule,

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

    RouterModule.forRoot(MMR_ROOT_ROUTE, {useHash:false}),

    HttpModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

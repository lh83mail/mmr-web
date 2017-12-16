import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {MatSidenavModule, MatToolbarModule} from '@angular/material';
import {RouterModule} from '@angular/router';
import {MMR_ROOT_ROUTE} from './app.route';
import {HomeComponent} from './pages/home/home.component';
import {MMRModule} from "./@theme/mmr.module";
import {DataObjectService} from "./services/data-object.service";
import {DataStoreService} from "./@theme/services/data-store.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MMRModule,

    MatToolbarModule,
    MatSidenavModule,

    RouterModule.forRoot(MMR_ROOT_ROUTE, {useHash:false}),

    HttpModule,
  ],
  providers: [
    DataObjectService,
    DataStoreService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import {
  MatCardModule, MatSidenavModule, MatToolbarModule, MatFormFieldModule, MatInputModule,
  MatIconModule, MatButtonModule, MatSelectModule, MatGridListModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { MMR_ROOT_ROUTE } from './app.route';
import { HomeComponent } from './pages/home/home.component';
import {DataObjectService} from "./services/data-object.service";
import {MMRModule} from "./@theme/mmr-module";

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

    RouterModule.forRoot(MMR_ROOT_ROUTE),

    HttpModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

/**
 * Created by Drools on 2017/5/24.
 */
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpInterceptorService, HttpClientInterceptor } from './http-interceptor.service';
import { AppState } from '../application.state';
import { Router } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

export function httpUseFactory(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
  appState: AppState,
  router: Router) {
  return new HttpInterceptorService(backend, defaultOptions, appState, router);
}

@NgModule({
  imports: [HttpModule, HttpClientModule]
})
export class MmrHttpModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: MmrHttpModule,
      providers: [
        {
          provide: Http,
          useFactory: httpUseFactory,
          deps: [XHRBackend, RequestOptions, AppState, Router]
        },
        {provide: HTTP_INTERCEPTORS, useClass: HttpClientInterceptor, multi: true}
      ],
    };
  }
}

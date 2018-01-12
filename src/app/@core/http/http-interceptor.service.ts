/**
 * Created by Drools on 2017/5/24.
 */
import { Injectable } from '@angular/core';
import {
  ConnectionBackend, Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response,
  URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpSentEvent } from '@angular/common/http';
import { HttpHeaderResponse } from '@angular/common/http';
import { HttpProgressEvent } from '@angular/common/http';
import { HttpResponse } from '@angular/common/http';
import { HttpUserEvent } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AppState } from '../application.state';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(private appState: AppState, private router: Router){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(req);
    // const options:any = {};
    // if (!options.headers) {
    //   options.headers = new HttpHeaders();
    // }
    // if (!req.headers.has('Accept')) {
    //   req.headers.set('Accept', 'application/json');
    // }

    // const token = this.appState.get('token');
    // if (token) {
    //   options.headers.set('token', token);
    // }

    // req = req.clone(options);
    
    // return next.handle(req).do(event => {
    //    if (event instanceof HttpResponse) {
    //       // auth failed
    //       if (event.status == 401) {
    //         this.router.navigate(['/login']);
    //         // 清除本地数据
    //         this.appState.clear();
    //       }
    //    } 
    //    return event;               
    // });
  }

}

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private appState: AppState, private router: Router) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptions) {
    return super.request(url, options);
  }

  get(url: string, options ?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
  }

  post(url: string, body: string, options ?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options ?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  delete(url: string, options ?: RequestOptionsArgs): Observable<Response> {
    return this.intercept(super.put(url, this.getRequestOptionArgs(options)));
  }

  getRequestOptionArgs(options ?: RequestOptionsArgs): RequestOptionsArgs {
    // if (!options) {
    //   options = new RequestOptions();
    // }
    // if (!options.headers) {
    //   options.headers = new Headers();
    // }

    // options.headers.set('Accept', 'application/json');

    // // 不指定Content-Type, 默认是application/json
    // if (!options.headers.get('Content-Type')) {
    //   options.headers.set('Content-Type', 'application/json');
    // }

    // const token = this.appState.get('token');

    // // console.debug('http-interceptor', token);

    // if (token) {
    //   options.headers.set('token', token);
    // }

    return options;
  }

  intercept(observable: Observable<Response>): Observable<Response> {
    return observable;
    // return observable.do(response => {
    // }, error => {

    //   // auth failed
    //   if (error.status == 401) {
    //     this.router.navigate(['/login']);

    //     // 清除本地数据
    //     this.appState.clear();
    //   } else {
    //     console.error(error);
    //   }
    // }, () => {
    // });
  }
}

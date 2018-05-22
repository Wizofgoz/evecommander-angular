import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import {API_BASE} from '../base.service';

@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');
    if (idToken && req.url.includes(API_BASE.EVE_COMMANDER)) {
      const cloned = req.clone({headers: req.headers.set('Authorization', 'Bearer' + idToken)});
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}

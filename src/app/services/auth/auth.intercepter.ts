import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthIntercepter implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem('id_token');
    if (idToken) {
      const cloned = req.clone({headers: req.headers.set('Authorization', 'Bearer' + idToken)});
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}

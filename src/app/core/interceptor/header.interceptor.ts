import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  /**
   * Constructor HeaderInterceptor
   *
   * @param {AuthService} authService
   */
  public constructor(public authService: AuthService) {}

  /**
   * @inheritDoc
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('Content-Type') && req.headers.get('enctype') !== 'multipart/form-data') {
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    }

    if (this.authService.isAuthenticated()) {
      req = req.clone({headers: req.headers.set('Authorization', `Bearer ${TokenService.getAccessToken()}`)});
    }

    return next.handle(req);
  }
}

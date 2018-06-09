import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// import { AuthService } from '../services/auth.service';

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {
  /**
   * Constructor ContentTypeInterceptor
   */
  public constructor() {}

  /**
   * @inheritDoc
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!req.headers.has('Content-Type') && req.headers.get('enctype') !== 'multipart/form-data') {
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    }

    return next.handle(req);
  }
}

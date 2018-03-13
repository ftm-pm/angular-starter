import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefresh: boolean;
  /**
   * @param {AuthService} authService
   * @param {Router} router
   */
  public constructor(private authService: AuthService, private router: Router) {
    this.isRefresh = false;
  }

  /**
   * @inheritDoc
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch(error => {
        if (error instanceof HttpErrorResponse && !this.isRefresh) {
          const status: number = (<HttpErrorResponse>error).status;
          this.isRefresh = true;
          if (status === 400 || status === 401) {
            return this.authService.refresh()
              .flatMap(token => {
                this.isRefresh = false;
                const newRequest = req.clone({headers: req.headers.set('Authorization', `Bearer ${TokenService.getAccessToken()}`)});

                return next.handle(newRequest);
              })
              .catch(() => {
                this.isRefresh = false;
                TokenService.removeToken();

                return this.router.navigate(['/login']);
              });
          }
        } else {
          return Observable.throw(error);
        }
      });
  }
}
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

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
    let authApi: any;
    for (const key in environment.api) {
      if (environment.api.hasOwnProperty(key)) {
        const api = environment.api[key];
        if (api.jwt && req.url.indexOf(api.path) >= 0) {
          req = req.clone({headers: req.headers.set('Authorization', `Bearer ${TokenService.getAccessToken(api.name)}`)});
          authApi = api;
          break;
        }
      }
    }

    return next.handle(req)
      .catch(error => {
        if (error instanceof HttpErrorResponse && !this.isRefresh) {
          const status: number = (<HttpErrorResponse>error).status;
          this.isRefresh = true;
          if (status === 400 || status === 401) {
            let apiName: string = null;
            if (authApi) {
              apiName = authApi.name;
            }

            return this.authService.refresh(apiName)
              .flatMap(token => {
                this.isRefresh = false;
                let newRequest = req;
                if (authApi) {
                  newRequest = req.clone({headers: req.headers.set('Authorization', `Bearer ${TokenService.getAccessToken(apiName)}`)});
                }

                return next.handle(newRequest);
              })
              .catch(() => {
                this.isRefresh = false;
                TokenService.removeToken(apiName);

                return this.router.navigate(['/login']);
              });
          }
        } else {
          return Observable.throw(error);
        }
      });
  }
}

import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private isRefresh: boolean;
  private authService: AuthService;

  public constructor(private router: Router, private tokenService: TokenService) {
    this.isRefresh = false;
    // this.authService = injector.get(AuthService);
  }

  /**
   * @inheritDoc
   */
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const api: any = environment.api;
    req = req.clone({headers: req.headers.set('Authorization', `Bearer ${this.tokenService.getAccessToken()}`)});

    return next.handle(req).pipe(catchError((error => {
      // if (error instanceof HttpErrorResponse && !this.isRefresh && api.refresh) {
      //   const status: number = (<HttpErrorResponse>error).status;
      //   this.isRefresh = true;
      //   if (status === 400 || status === 401) {
      //     return this.authService.refresh()
      //       .flatMap(token => {
      //         this.isRefresh = false;
      //         const newRequest = req.clone({headers: req.headers.set('Authorization', `Bearer ${TokenService.getAccessToken()}`)});
      //
      //         return next.handle(newRequest);
      //       })
      //       .catch(() => {
      //         this.isRefresh = false;
      //         TokenService.removeToken();
      //         return this.router.navigate(['/login']);
      //       });
      //   } else {
      //     return Observable.throw(error);
      //   }
      // } else {
      return throwError(error);
      // }
    })));
  }
}

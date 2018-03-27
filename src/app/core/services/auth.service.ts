import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { TokenService } from './token.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private auth: BehaviorSubject<boolean>;

  /**
   * Constructor AuthService
   *
   * @param {HttpClient} httpClient
   * @param {JwtHelperService} jwtHelperService
   */
  public constructor(private httpClient: HttpClient, private jwtHelperService: JwtHelperService, private tokenService: TokenService ) {
    if (this.auth === undefined) {
      this.auth = new BehaviorSubject<boolean>(this.isAuthenticated());
    }
  }

  /**
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    const token = this.tokenService.getAccessToken();

    return token && !this.jwtHelperService.isTokenExpired(token);
  }

  /**
   * @returns {Observable<boolean>}
   */
  public getAuthenticated(): Observable<boolean> {
    return this.auth.asObservable();
  }

  /**
   * @returns {Observable<boolean>}
   */
  public setAuthenticated(value: boolean): void {
    this.auth.next(value);
  }

  /**
   * Login
   *
   * @param data
   * @returns {Observable<any>}
   */
  public login(data: any) {
    const path: string = `${environment.api.path}/api/token/get`;

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .map(response => {
        this.tokenService.setAccessToken(response['token']);
        this.tokenService.setRefreshToken(response['refresh_token']);
        this.setAuthenticated(true);

        return response;
      })
      .catch(this.handleError);
  }

  /**
   * @returns {Observable<any>}
   */
  public refresh() {
    const path: string = `${environment.api.path}/api/token/refresh`;
    const data = {
      'refresh_token': this.tokenService.getRefreshToken()
    };

    if (!data['refresh_token']) {
      return Observable.of(null);
    }

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .map(response => {
        this.tokenService.setAccessToken(response['token']);
        this.tokenService.setRefreshToken(response['refresh_token']);
        this.setAuthenticated(true);

        return response;
      })
      .catch(error => {
        this.tokenService.removeToken();
        return Observable.throw(error);
      });
  }

  /**
   * Login
   */
  public logout(): void {
    this.tokenService.removeToken();
    this.setAuthenticated(false);
  }

  /**
   * @param {HttpErrorResponse | any} error
   * @returns {ErrorObservable}
   */
  private handleError(error: HttpErrorResponse | any) {
    let errMsg: any, body: any;
    if (error instanceof HttpErrorResponse) {
      body = error;
    } else {
      body = JSON.parse(error) || error || '';
    }

    if (typeof body.error === 'string') {
      let err = JSON.parse(body.error);
      if (err.error) {
        err = err.error;
      }
      if (err.message) {
        errMsg = err.message;
      } else if (err.exception) {
        if (err.exception.length > 0) {
          errMsg = `${err.exception[0].message}`;
        } else {
          errMsg = `${err.exception.message}`;
        }
      } else {
        errMsg = err.toString();
      }
    } else if (body.message) {
      errMsg = body.message;
    } else {
      errMsg = body.toString();
    }

    return Observable.throw(errMsg);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwtDecode from 'jwt-decode';
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
  private defaultApi: string = environment.api.backend.name;

  /**
   * Constructor AuthService
   *
   * @param {HttpClient} httpClient
   * @param {JwtHelperService} jwtHelperService
   */
  public constructor(private httpClient: HttpClient, public jwtHelperService: JwtHelperService) {
    if (this.auth === undefined) {
      this.auth = new BehaviorSubject<boolean>(this.isAuthenticated());
    }
  }

  /**
   * Init
   */
  public static init(): void {
    for (const key in environment.api) {
      if (environment.api.hasOwnProperty(key)) {
        const api = environment.api[key];
        if (api.token) {
          TokenService.setAccessToken(api.token, api.name);
        }
        if (api.refreshToken) {
          TokenService.setRefreshToken(api.refreshToken, api.name);
        }
      }
    }
  }

  /**
   * @returns {boolean}
   */
  public isAuthenticated(apiName: string = environment.api.backend.name): boolean {
    const token = TokenService.getAccessToken(apiName);

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
   * @returns {any | null}
   */
  public getAuthenticatedData():  any|null {
    const token = TokenService.getAccessToken(this.defaultApi);
    if (!token) {
      return;
    }

    return jwtDecode(token);
  }

  /**
   * Login
   *
   * @param data
   * @param {string} apiName
   * @returns {Observable<any>}
   */
  public login(data: any, apiName: string = environment.api.backend.name) {
    const path: string = `${environment.api[apiName].path}/api/token/get`;

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .map(response => {
        TokenService.setAccessToken(response['token'], apiName);
        TokenService.setRefreshToken(response['refresh_token'], apiName);
        if (apiName === environment.api.backend.name) {
          this.setAuthenticated(true);
        }

        return response;
      })
      .catch(this.handleError);
  }

  /**
   * @returns {Observable<any>}
   */
  public refresh(apiName: string = environment.api.backend.name) {
    const path: string = `${environment.api[apiName].path}/api/token/refresh`;
    const data = {
      'refresh_token': TokenService.getRefreshToken(this.defaultApi)
    };

    if (!data['refresh_token']) {
      return Observable.of(null);
    }

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .map(response => {
        TokenService.setAccessToken(response['token'], this.defaultApi);
        TokenService.setRefreshToken(response['refresh_token'], this.defaultApi);
        this.setAuthenticated(true);

        return response;
      })
      .catch(error => {
        TokenService.removeToken(null);
        return Observable.throw(error);
      });
  }

  /**
   * Login
   */
  public logout(): void {
    TokenService.removeToken(this.defaultApi);
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

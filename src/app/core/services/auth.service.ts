import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

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
  public constructor(private httpClient: HttpClient, public jwtHelperService: JwtHelperService) {
    if (this.auth === undefined) {
      this.auth = new BehaviorSubject<boolean>(this.isAuthenticated());
    }
  }

  /**
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    const token = TokenService.getAccessToken();

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
    const token = TokenService.getAccessToken();
    if (!token) {
      return;
    }

    return jwtDecode(token);
  }

  /**
   * Login
   *
   * @param data
   * @returns {Observable<any>}
   */
  public login(data: any) {
    const path: string = `${environment.api}/${environment.apiPrefix}/token/get`;

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .map(response => {
        TokenService.setAccessToken(response['token']);
        TokenService.setRefreshToken(response['refresh_token']);
        this.setAuthenticated(true);

        return response;
      })
      .catch(this.handleError);
  }

  /**
   * @returns {Observable<any>}
   */
  public refresh() {
    const path: string = `${environment.api}/${environment.apiPrefix}/token/refresh`;
    const data = {
      'refresh_token': TokenService.getRefreshToken()
    };

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .map(response => {
        TokenService.setAccessToken(response['token']);
        TokenService.setRefreshToken(response['refresh_token']);
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
    TokenService.removeToken();
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

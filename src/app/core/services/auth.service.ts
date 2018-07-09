import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';

import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  public auth: BehaviorSubject<boolean>;
  private readonly url: string;

  /**
   * @param {HttpClient} httpClient
   * @param {JwtHelperService} jwtHelperService
   * @param {TokenService} tokenService
   */
  public constructor(private httpClient: HttpClient,
                     private jwtHelperService: JwtHelperService,
                     private tokenService: TokenService) {
    if (this.auth === undefined) {
      this.auth = new BehaviorSubject<boolean>(this.isAuthenticated());
    }
    this.url = `${environment.api.path}/${environment.api.prefix}`;
  }

  /**
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    const token = this.tokenService.getAccessToken();

    return token && !this.jwtHelperService.isTokenExpired(token);
  }

  /**
   * @returns {boolean}
   */
  public isModerator(): boolean {
    const token = this.tokenService.getAccessToken();

    return token && this.jwtHelperService.decodeToken(token)['roles'].filter(role => role === 'ROLE_MODERATOR').length > 0;
  }

  /**
   * @returns {number}
   */
  public uid(): number {
    return +this.tokenService.getUserId();
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
    const path: string = `${this.url}/token/get`;

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .pipe(
        map(response => {
          this.tokenService.setAccessToken(response['token']);
          this.tokenService.setRefreshToken(response['refresh_token']);
          this.tokenService.setUserId(response['id']);
          this.setAuthenticated(true);

          return response;
        }),
        catchError(this.handleError)
      );
  }

  /**
   * Register
   *
   * @param data
   * @returns {Observable<any>}
   */
  public register(data: any) {
    const path: string = `${this.url}/register`;

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Confirmation
   *
   * @param {string} data
   * @returns {Observable<any>}
   */
  public confirmation(data: string) {
    const path: string = `${this.url}/confirmation/${data}`;

    return this.httpClient.get<HttpResponse<boolean>>(path)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * @returns {Observable<any>}
   */
  public refresh() {
    const path: string = `${this.url}/token/refresh`;
    const data = {
      'refresh_token': this.tokenService.getRefreshToken()
    };

    if (!data['refresh_token']) {
      return of(null);
    }

    return this.httpClient.post<HttpResponse<any>>(path, JSON.stringify(data))
      .pipe(
        map(response => {
          this.tokenService.setAccessToken(response['token']);
          this.tokenService.setRefreshToken(response['refresh_token']);
          this.setAuthenticated(true);

          return response;
        }),
        catchError(error => {
          this.tokenService.removeToken();
          return throwError(error);
        })
      );
  }

  /**
   * Login
   */
  public logout(): void {
    this.tokenService.removeToken();
    // this.userService.clear();
    this.setAuthenticated(false);
  }

  /**
   * @param response
   * @returns {Observable<string>}
   */
  private handleError(response: any) {
    return of(response);
  }
}

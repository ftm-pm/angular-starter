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

  /**
   * @param {HttpClient} httpClient
   * @param {JwtHelperService} jwtHelperService
   * @param {TokenService} tokenService
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
      .pipe(
        map(response => {
          this.tokenService.setAccessToken(response['token']);
          this.tokenService.setRefreshToken(response['refresh_token']);
          this.setAuthenticated(true);

          return response;
        }),
        catchError(this.handleError())
      );
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
    this.setAuthenticated(false);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

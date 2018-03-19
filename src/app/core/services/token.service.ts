import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class TokenService {
  public static appPrefix: string = environment.app.id;

  /**
   * TokenService
   */
  public constructor() {}

  /**
   * Get access token
   */
  public static getAccessToken(apiName: string): string {
    return localStorage.getItem(`${TokenService.appPrefix}_${apiName}_access_token`);
  }

  /**
   * Get refresh token
   */
  public static getRefreshToken(apiName: string): string {
    return localStorage.getItem(`${TokenService.appPrefix}_${apiName}_refresh_token`);
  }

  /**
   * Set access token
   */
  public static setAccessToken(token: string, apiName: string): void {
    localStorage.setItem(`${TokenService.appPrefix}_${apiName}_access_token`, token);
  }

  /**
   * Set refresh token
   */
  public static setRefreshToken(token: string, apiName: string): void {
    localStorage.setItem(`${TokenService.appPrefix}_${apiName}_refresh_token`, token);
  }

  /**
   * Set refresh token
   */
  public static removeToken(apiName: string): void {
    localStorage.removeItem(`${TokenService.appPrefix}_${apiName}_access_token`);
    localStorage.removeItem(`${TokenService.appPrefix}_${apiName}_refresh_token`);
  }
}

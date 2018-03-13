import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class TokenService {
  private static appPrefix: string = environment.appId;
  private static apiPrefix: string = environment.apiPrefix;

  /**
   * TokenService
   */
  public constructor() {}

  /**
   * Get access token
   */
  public static getAccessToken(apiPrefix: string = TokenService.apiPrefix): string {
    return localStorage.getItem(`${TokenService.appPrefix}_${apiPrefix}_access_token`);
  }

  /**
   * Get refresh token
   */
  public static getRefreshToken(apiPrefix: string = TokenService.apiPrefix): string {
    return localStorage.getItem(`${TokenService.appPrefix}_${apiPrefix}_refresh_token`);
  }

  /**
   * Set access token
   */
  public static setAccessToken(token: string, apiPrefix: string = TokenService.apiPrefix): void {
    localStorage.setItem(`${TokenService.appPrefix}_${apiPrefix}_access_token`, token);
  }

  /**
   * Set refresh token
   */
  public static setRefreshToken(token: string, apiPrefix: string = TokenService.apiPrefix): void {
    localStorage.setItem(`${TokenService.appPrefix}_${apiPrefix}_refresh_token`, token);
  }

  /**
   * Set refresh token
   */
  public static removeToken(apiPrefix: string = TokenService.apiPrefix): void {
    localStorage.removeItem(`${TokenService.appPrefix}_${apiPrefix}_access_token`);
    localStorage.removeItem(`${TokenService.appPrefix}_${apiPrefix}_refresh_token`);
  }
}

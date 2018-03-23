import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class TokenService {
  public static appId: string = environment.app.id;

  /**
   * TokenService
   */
  public constructor() {}

  /**
   * Get access token
   */
  public static getAccessToken(): string {
    return localStorage.getItem(`${TokenService.appId}_access_token`);
  }

  /**
   * Get refresh token
   */
  public static getRefreshToken(): string {
    return localStorage.getItem(`${TokenService.appId}_refresh_token`);
  }

  /**
   * Set access token
   */
  public static setAccessToken(token: string): void {
    localStorage.setItem(`${TokenService.appId}_access_token`, token);
  }

  /**
   * Set refresh token
   */
  public static setRefreshToken(token: string): void {
    localStorage.setItem(`${TokenService.appId}_refresh_token`, token);
  }

  /**
   * Set refresh token
   */
  public static removeToken(): void {
    localStorage.removeItem(`${TokenService.appId}_access_token`);
    localStorage.removeItem(`${TokenService.appId}_refresh_token`);
  }
}

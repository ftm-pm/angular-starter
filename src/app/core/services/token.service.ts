import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class TokenService {
  private static prefix: string = environment.appId;

  /**
   * TokenService
   */
  public constructor() {}

  /**
   * Get access token
   */
  public static getAccessToken(): string {
    return localStorage.getItem(`${TokenService.prefix}_access_token`);
  }

  /**
   * Get refresh token
   */
  public static getRefreshToken(): string {
    return localStorage.getItem(`${TokenService.prefix}_refresh_token`);
  }

  /**
   * Set access token
   */
  public static setAccessToken(token: string): void {
    localStorage.setItem(`${TokenService.prefix}_access_token`, token);
  }

  /**
   * Set refresh token
   */
  public static setRefreshToken(token: string): void {
    localStorage.setItem(`${TokenService.prefix}_refresh_token`, token);
  }

  /**
   * Set refresh token
   */
  public static removeToken(): void {
    localStorage.removeItem(`${TokenService.prefix}_access_token`);
    localStorage.removeItem(`${TokenService.prefix}_refresh_token`);
  }
}

import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { environment } from '../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class TokenService {
  public static appId: string = environment.app.id;

  /**
   * TokenService
   */
  public constructor(@Inject(PLATFORM_ID) private platformId: any,
                     @Inject('LOCALSTORAGE') private localStorage: any) {
  }

  /**
   * Get access token
   */
  public getAccessToken(): string | null {
    return isPlatformBrowser(this.platformId) ? this.localStorage.getItem(`${TokenService.appId}_access_token`) : null;
  }

  /**
   * Get refresh token
   */
  public getRefreshToken(): string {
    return isPlatformBrowser(this.platformId) ? this.localStorage.getItem(`${TokenService.appId}_refresh_token`) : null;
  }

  /**
   * Set access token
   */
  public setAccessToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage.setItem(`${TokenService.appId}_access_token`, token);
    }
  }

  /**
   * Set refresh token
   */
  public setRefreshToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage.setItem(`${TokenService.appId}_refresh_token`, token);
    }
  }

  /**
   * Set refresh token
   */
  public removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorage.removeItem(`${TokenService.appId}_access_token`);
      this.localStorage.removeItem(`${TokenService.appId}_refresh_token`);
    }
  }
}

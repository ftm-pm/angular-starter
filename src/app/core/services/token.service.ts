import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AppStorage } from '../storage/app-storage.inject';

@Injectable()
export class TokenService {
  public static appId: string = environment.app.id;

  /**
   * TokenService
   */
  public constructor(@Inject(PLATFORM_ID) private platformId: any,
                     @Inject(AppStorage) private localStorage: Storage) {
  }

  /**
   * Get access token
   */
  public getAccessToken(): string | null {
    return this.localStorage.getItem(`${TokenService.appId}_access_token`);
  }

  /**
   * Get refresh token
   */
  public getRefreshToken(): string {
    return this.localStorage.getItem(`${TokenService.appId}_refresh_token`);
  }

  /**
   * Set access token
   */
  public setAccessToken(token: string): void {
    this.localStorage.setItem(`${TokenService.appId}_access_token`, token);
  }

  /**
   * Set refresh token
   */
  public setRefreshToken(token: string): void {
    this.localStorage.setItem(`${TokenService.appId}_refresh_token`, token);
  }

  /**
   * Set refresh token
   */
  public removeToken(): void {
    this.localStorage.removeItem(`${TokenService.appId}_access_token`);
    this.localStorage.removeItem(`${TokenService.appId}_refresh_token`);
  }
}

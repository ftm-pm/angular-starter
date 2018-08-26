import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class BrowserStorage implements Storage {
  [index: number]: string;
  [key: string]: any;
  public length: number;

  constructor(private cookieService: CookieService) {
  }

  public clear(): void {
    this.cookieService.removeAll();
  }

  public getItem(key: string): string {
    return this.cookieService.get(key);
  }

  public key(index: number): string {
    return this.cookieService.getAll().propertyIsEnumerable[index];
  }

  public removeItem(key: string): void {
    this.cookieService.remove(key);
  }

  public setItem(key: string, data: string): void {
    this.cookieService.put(key, data);
  }
}

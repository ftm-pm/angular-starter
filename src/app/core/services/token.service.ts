import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { environment } from '../../../environments/environment';
import { AppStorage } from '../storages';

@Injectable({providedIn: 'root'})
export class TokenService {
  constructor(@Inject(PLATFORM_ID) private platformId: any,
              @Inject(AppStorage) private localStorage: Storage) {
  }

  public getLang(): string {
    return this.localStorage.getItem(`${environment.appId}_lang`) || environment.defaultLanguage;
  }

  public setLang(lang: string): void {
    this.localStorage.setItem(`${environment.appId}_lang`, lang);
  }
}

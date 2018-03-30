import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { environment } from '../../../environments/environment';
import { AppStorage } from '../storage/universal.inject';

@Injectable()
export class LanguageService {
  private static appId: string = environment.app.id;
  private languages: string[];
  private defaultLanguage: string;
  private language: BehaviorSubject<string>;

  /**
   * Constructor LanguageService
   * @param platformId
   * @param localStorage
   * @param {TranslateService} translateService
   */
  public constructor(@Inject(PLATFORM_ID) private platformId: any,
                     @Inject(AppStorage) private localStorage: Storage,
                     private translateService: TranslateService) {
    this.languages = environment.languages;
    this.defaultLanguage = environment.defaultLanguage;
    if (this.language === undefined) {
      this.language = new BehaviorSubject<string>(this.getLanguage());
    }
  }

  /**
   * @returns {string}
   */
  public getLanguage(): string|null {
    return this.localStorage.getItem(LanguageService.appId + '_lang');
  }

  /**
   * @returns {string[]}
   */
  public getLanguages(): string[] {
    return this.languages;
  }

  /**
   * @returns {string}
   */
  public getDefaultLanguage(): string {
    return this.defaultLanguage;
  }

  /**
   * @param {string} lang
   * @returns {boolean}
   */
  public hasLang(lang: string): boolean {
    return this.languages.indexOf(lang) >= 0;
  }

  ///////////////////////

  /**
   * Init languages
   */
  public init(): void {
    this.translateService.addLangs(this.languages);
    let lang = environment.defaultLanguage;
    lang = this.getLanguage();
    if (!lang || !this.hasLang(lang)) {
      lang = this.defaultLanguage;
    }
    this.translateService.setDefaultLang(lang);
    this.setLanguage(lang);
  }

  /**
   * Set language
   *
   * @param {string} lang
   * @returns {Observable<any>}
   */
  public setLanguage(lang): Observable<any> {
    this.localStorage.setItem(LanguageService.appId + '_lang', lang);

    return this.translateService.use(lang);
  }

  /**
   * @returns {Observable<string>}
   */
  public getLang(): Observable<string> {
    return this.language.asObservable();
  }
}

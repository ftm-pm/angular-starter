import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';

@Injectable()
export class LanguageService {
  private static prefix: string  = environment.app.id;
  private static languages: string[] = environment.languages;
  private static defaultLanguage: string = environment.defaultLanguage;

  /**
   * @param {TranslateService} translateService
   */
  public constructor(private translateService: TranslateService) {}

  /**
   * @returns {string}
   */
  public static getLanguage(): string {
    return localStorage.getItem(LanguageService.prefix + '_lang');
  }

  /**
   * @returns {string[]}
   */
  public static getLanguages(): string[] {
    return LanguageService.languages;
  }

  /**
   * @returns {string}
   */
  public static getDefaultLanguage(): string {
    return LanguageService.defaultLanguage;
  }

  /**
   * @param {string} lang
   * @returns {boolean}
   */
  public static hasLang(lang: string): boolean {
    return LanguageService.languages.indexOf(lang) >= 0;
  }

  ///////////////////////

  /**
   * Init languages
   */
  public init(): void {
    this.translateService.addLangs(LanguageService.languages);
    let lang = LanguageService.getLanguage() || navigator.language;
    if (!LanguageService.hasLang(lang)) {
      lang = LanguageService.defaultLanguage;
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
    localStorage.setItem(LanguageService.prefix + '_lang', lang);

    return this.translateService.use(lang);
  }
}

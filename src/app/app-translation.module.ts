import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';

import { LanguageService } from './core/services/language.service';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [TranslateModule],
  providers: [TranslateService]
})
export class AppTranslationModule {

  /**
   * Constructor AppTranslationModule
   *
   * @param {LanguageService} languageService
   */
  public constructor(private languageService: LanguageService) {
    languageService.init();
  }

}

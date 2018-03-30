import { NgModule } from '@angular/core';
import { BrowserModule, BrowserTransferStateModule, TransferState } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateLoader, TranslateModule, ɵa as TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { REQUEST } from '@nguniversal/express-engine/tokens';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { TranslateBrowserLoader } from './core/utils/translate-browser-loader.service';
import { LanguageService } from './core/services/language.service';
import { AppModule } from './app.module';
import { AppStorage } from './core/storage/universal.inject';
import { CookieStorage } from './core/storage/browser.storage';

export function getJwtToken() {
  return window.localStorage.getItem(`${environment.app.id}_access_token`);
}

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}

// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie } };
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: environment.app.id }),
    BrowserTransferStateModule,
    TransferHttpCacheModule,
    AppModule,
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (exportTranslateStaticLoader),
          deps: [HttpClient, TransferState]
        }
      }
    ),
    JwtModule.forRoot({
      config: {
        tokenGetter: getJwtToken,
        whitelistedDomains: [environment.api.path]
      }
    }),
  ],
  providers: [
    {
      // The server provides these in main.server
      provide: REQUEST, useFactory: (getRequest)
    },
    { provide: AppStorage, useClass: CookieStorage },
    TranslateStore,
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
  /**
   * Constructor AppModule
   *
   * @param {LanguageService} languageService
   */
  public constructor(private languageService: LanguageService) {
    this.languageService.init();
  }
}

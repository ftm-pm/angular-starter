import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { CookieModule } from 'ngx-cookie';

import { environment } from '../environments/environment.prod';
import { AppModule } from './app.module';
import { AppComponent } from './core/components';
import { AppStorage, BrowserStorage } from './core/storages';
import { BrowserTranslateLoader } from './core/translate-loaders';
import { getCookie } from './core/utils';

/**
 * Note: The Request object only lives on the server
 */
export function getRequest(): any {
  return {headers: {cookie: document.cookie}};
}

/**
 * Create translation loader for Browser
 *
 * @param http
 * @param transferState
 */
export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new BrowserTranslateLoader('/assets/i18n/', '.json', transferState, http);
}

export function getJwtToken() {
  return getCookie(`${environment.appId}_access_token`);
}

@NgModule({
  imports: [
    AppModule,
    CookieModule.forRoot(),
    TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: (exportTranslateStaticLoader),
          deps: [HttpClient, TransferState]
        }
      }
    ),
  ],
  providers: [
    {provide: REQUEST, useFactory: (getRequest)},
    {provide: AppStorage, useClass: BrowserStorage},
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}

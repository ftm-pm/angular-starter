import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AppStorage } from './core/storage/app-storage.inject';
import { BrowserStorage } from './core/storage/browser.storage';
import { TranslateBrowserLoader } from './core/utils/translate-browser-loader.service';


// the Request object only lives on the server
export function getRequest(): any {
  return { headers: { cookie: document.cookie } };
}

export function getCookie(name) {
  const pattern: string = '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)';
  const matches = document.cookie.match(new RegExp(pattern));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function getJwtToken() {
  return getCookie(`${environment.app.id}_access_token`);
}

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}

@NgModule({
  imports: [
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
    CookieService,
    {
      // The server provides these in main.server
      provide: REQUEST, useFactory: (getRequest)
    },
    { provide: AppStorage, useClass: BrowserStorage },
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}

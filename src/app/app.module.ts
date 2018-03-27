import { NgModule } from '@angular/core';
import { BrowserModule, TransferState } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { PLATFORM_ID, APP_ID, Inject } from '@angular/core';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { TranslateLoader, TranslateModule, ɵa as TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TranslateBrowserLoader } from './translate-browser-loader.service';
import { LanguageService } from './core/services/language.service';

export function getJwtToken() {
  return (typeof window !== 'undefined') ? window.localStorage.getItem(`${environment.app.id}_access_token`) : null;
}

export function getLocalStorage() {
  return (typeof window !== 'undefined') ? window.localStorage : null;
}

export function exportTranslateStaticLoader(http: HttpClient, transferState: TransferState) {
  return new TranslateBrowserLoader('/assets/i18n/', '.json', transferState, http);
}


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: environment.app.id}),
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule.forChild({
        loader: {
          provide: TranslateLoader,
          useFactory: (exportTranslateStaticLoader),
          deps: [HttpClient, TransferState]
        }
      }
    ),
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getJwtToken,
        whitelistedDomains: [environment.api.path]
      }
    }),
    SharedModule.forRoot(),
    TransferHttpCacheModule
  ],
  providers: [
    TranslateStore,
    {
      provide: 'LOCALSTORAGE',
      useFactory: getLocalStorage
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  /**
   * Constructor AppModule
   *
   * @param {Object} platformId
   * @param {string} appId
   * @param {LanguageService} languageService
   */
  public constructor(@Inject(PLATFORM_ID) private platformId: Object,
                     @Inject(APP_ID) private appId: string,
                     private languageService: LanguageService) {
    this.languageService.init();
  }
}

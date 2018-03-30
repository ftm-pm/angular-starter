import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from '../environments/environment';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateServerLoader } from './core/utils/translate-server-loader.service';
import { LanguageService } from './core/services/language.service';
import { AppStorage } from './core/storage/universal.inject';
import { UniversalStorage } from './core/storage/server.storage';

export function getServerJwtToken() {
  return null;
}

export function translateFactory(transferState: TransferState) {
  return new TranslateServerLoader('/assets/i18n/', '.json', transferState);
}

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getServerJwtToken,
        whitelistedDomains: [environment.api.path]
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateFactory),
        deps: [TransferState]
      }
    }),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: AppStorage,
      useClass: UniversalStorage
    },
  ]
})
export class AppServerModule {
  /**
   * Constructor AppModule
   *
   * @param {LanguageService} languageService
   */
  public constructor(private languageService: LanguageService) {
    this.languageService.init();
  }
}

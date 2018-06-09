import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { JwtModule } from '@auth0/angular-jwt';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AppStorage } from './core/storage/app-storage.inject';
import { ServerStorage } from './core/storage/storage.service';
import { TranslateServerLoader } from './core/utils/translate-server-loader.service';

export function getServerJwtToken() {
  return null;
}

export function translateFactory(transferState: TransferState) {
  return new TranslateServerLoader('/assets/i18n/', '.json', transferState);
}

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
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
  providers: [
    {
      provide: AppStorage,
      useClass: ServerStorage
    }
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent]
})
export class AppServerModule {
}

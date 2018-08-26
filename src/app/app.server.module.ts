import { NgModule } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { CookieService, CookieBackendService } from 'ngx-cookie';

import { AppModule } from './app.module';
import { AppComponent } from './core/components';
import { AppStorage, ServerStorage } from './core/storages';
import { TranslateServerLoader } from './core/translate-loaders';

/**
 * Create translation loader for Server
 *
 * @param transferState
 */
export function translateFactory(transferState: TransferState) {
  return new TranslateServerLoader(transferState);
}

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateFactory),
        deps: [TransferState]
      }
    }),
  ],
  providers: [
    {provide: CookieService, useClass: CookieBackendService},
    {provide: AppStorage, useClass: ServerStorage}
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {
}

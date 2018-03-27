import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TransferState } from '@angular/platform-browser';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { TranslateServerLoader } from './translate-server-loader.service';

export function translateFactory(transferState: TransferState) {
  return new TranslateServerLoader('/assets/i18n/', '.json', transferState);
}

@NgModule({
  imports: [
    // The AppServerModule should import your AppModule followed
    // by the ServerModule from @angular/platform-server.
    AppModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateFactory),
        deps: [TransferState]
      }
    }),
    ServerModule,
    ModuleMapLoaderModule,
    ServerTransferStateModule,
  ],
  // Since the bootstrapped component is not inherited from your
  // imported AppModule, it needs to be repeated here.
  bootstrap: [AppComponent],
})
export class AppServerModule {
}

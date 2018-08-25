import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TransferHttpCacheModule } from '@nguniversal/common';

import { environment } from '../environments/environment';
import { reducers, metaReducers } from './app-root.reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/components';
import { CoreModule } from './core/core.module';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({appId: 'angular-starter'}),
    BrowserAnimationsModule,
    HttpClientModule,
    TransferHttpCacheModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Book Store App',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

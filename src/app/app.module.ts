import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppTranslationModule } from './app-translation.module';
import { SharedModule } from './shared/shared.module';
import { TokenService } from './core/services/token.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return TokenService.getAccessToken(environment.api.backend.name);
        },
        whitelistedDomains: [environment.api.backend.path, environment.api.media.path]
      }
    }),
    AppRoutingModule,
    AppTranslationModule,
    SharedModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

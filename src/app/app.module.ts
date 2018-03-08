import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppTranslationModule } from './app-translation.module';
import { JwtModule } from '@auth0/angular-jwt';
import { TokenService } from './core/services/token.service';
import { environment } from '../environments/environment';

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
          return TokenService.getAccessToken();
        },
        whitelistedDomains: [environment.api, environment.media]
      }
    }),
    AppRoutingModule,
    AppTranslationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

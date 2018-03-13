import { NgModule,  Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { throwIfAlreadyLoaded } from './guard/module-import-guard';
import { HeaderInterceptor } from './interceptor/header.interceptor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { CoreRoutingModule } from './core-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LanguageService } from './services/language.service';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './components/logout/logout.component';


const CORE_COMPONENTS = [
  NavComponent,
  ToolbarComponent
];
const CORE_SERVICES = [
  AuthService,
  LanguageService,
  TokenService
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTabsModule,
    MatToolbarModule,
    TranslateModule.forChild(),
    CoreRoutingModule
  ],
  declarations: [
    ...CORE_COMPONENTS,
    ToolbarComponent,
    LoginComponent,
    LogoutComponent
  ],
  exports: [
    ...CORE_COMPONENTS
  ],
  providers:  [
    ...CORE_SERVICES,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeaderInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  /**
   * Constructor CoreModule
   * @param {CoreModule} parentModule
   */
  public constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

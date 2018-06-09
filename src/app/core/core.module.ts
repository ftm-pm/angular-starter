import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule,  Optional, SkipSelf } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatToolbarModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { NavComponent } from './components/nav/nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CoreRoutingModule } from './core-routing.module';
import { ContentTypeInterceptor } from './interceptor/content-type.interceptor';
import { JwtInterceptor } from './interceptor/jwt.interceptor';
import { AuthService } from './services/auth.service';
import { ImageService } from './services/image.service';
import { LanguageService } from './services/language.service';
import { TokenService } from './services/token.service';

/**
 * @param parentModule
 * @param {string} moduleName
 */
export function throwIfAlreadyLoaded(parentModule: any, moduleName: string): void {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}

const CORE_COMPONENTS = [
  NavComponent,
  ToolbarComponent
];
const CORE_SERVICES = [
  AuthService,
  LanguageService,
  ImageService,
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
    MatMenuModule,
    MatProgressSpinnerModule,
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
      useClass: ContentTypeInterceptor,
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

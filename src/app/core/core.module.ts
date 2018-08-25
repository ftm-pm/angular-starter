import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material';
import { AppComponent, LayoutComponent, NavItemComponent, SidenavComponent, ToolbarComponent } from './components';

const CORE_COMPONENTS = [
  AppComponent,
  LayoutComponent
];

export function throwIfAlreadyLoaded(parentModule: any, moduleName: string): void | never {
  if (parentModule) {
    throw new Error(`${moduleName} has already been loaded. Import Core modules in the AppModule only.`);
  }
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    ...CORE_COMPONENTS,
    SidenavComponent,
    ToolbarComponent,
    NavItemComponent
  ],
  exports: [
    ...CORE_COMPONENTS
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}

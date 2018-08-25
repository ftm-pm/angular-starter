import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const DASHBOARD_COMPONENTS = [
  DashboardComponent
];

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    DashboardRoutingModule
  ],
  declarations: [
    ...DASHBOARD_COMPONENTS
  ]
})
export class DashboardModule {
}

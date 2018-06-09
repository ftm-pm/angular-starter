import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    TranslateModule.forChild(),
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }

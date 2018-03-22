import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';

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

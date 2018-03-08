import { Component, OnDestroy, OnInit, Inject } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public data: any[];

  /**
   * Constructor DashboardComponent
   */
  public constructor() {
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
  }
}


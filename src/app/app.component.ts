import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AuthService } from './core/services/auth.service';
import { TokenService } from './core/services/token.service';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  /**
   * Constructor AppComponent
   */
  public constructor(private authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.subscription = new Subscription();
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    // TODO: Remove from component
    if (isPlatformBrowser(this.platformId)) {
      this.subscription.add(this.authService.getAuthenticated().subscribe(logged => {
        if (!logged && environment.api.refresh) {
          this.subscription.add(this.authService.refresh().subscribe());
        }
      }));
    }
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { TokenService } from './core/services/token.service';
import { environment } from '../environments/environment';

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
  public constructor(private authService: AuthService) {
    this.subscription = new Subscription();
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    // TODO: Remove from component
    this.subscription.add(this.authService.getAuthenticated().subscribe(logged => {
      if (!logged && TokenService.getRefreshToken(environment.api.backend.name)) {
        this.subscription.add(this.authService.refresh().subscribe());
      }
    }));
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

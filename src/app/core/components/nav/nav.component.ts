import { Component, OnDestroy, OnInit } from '@angular/core';

import { menu, MenuItem } from './menu';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  public menu: MenuItem[];
  public logged: boolean;
  private subscription: Subscription;

  /**
   * Constructor NavComponent
   */
  public constructor(private authService: AuthService) {
    this.menu = menu;
    this.logged = false;
    this.subscription = new Subscription();
  }

  /**
   * @inheritDoc
   */
  public ngOnInit(): void {
    this.subscription.add(this.authService.getAuthenticated()
      .subscribe(logged => {
        this.logged = logged;
      })
    );
  }

  /**
   * @inheritDoc
   */
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

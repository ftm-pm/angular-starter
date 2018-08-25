import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as fromRoot from '../../../app-root.reducer';
import * as LayoutActions from '../../actions/layout.actions';

@Component({
  selector: 'app-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-sidenav-container>
      <mat-sidenav #sidenav [opened]="showSidenav$ | async" (closedStart)="closeSidenav()">
        <mat-nav-list>
          <app-nav-item (navigate)="closeSidenav()" *ngIf="loggedIn$ | async" routerLink="/" icon="book" hint="View your book collection">
            My Collection
          </app-nav-item>
          <app-nav-item (navigate)="closeSidenav()" *ngIf="!(loggedIn$ | async)">
            Sign In
          </app-nav-item>
          <app-nav-item (navigate)="logout()" *ngIf="loggedIn$ | async">
            Sign Out
          </app-nav-item>
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-toolbar (openMenu)="openSidenav()">
          Angular Starter
        </app-toolbar>
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    // this.loggedIn$ = this.store.pipe(select(fromAuth.getLoggedIn));
  }

  closeSidenav() {
    this.store.dispatch(new LayoutActions.CloseSidenav());
  }

  openSidenav() {
    this.store.dispatch(new LayoutActions.OpenSidenav());

  }

  logout() {
    this.closeSidenav();
    // this.store.dispatch(new AuthActions.Logout());
  }
}

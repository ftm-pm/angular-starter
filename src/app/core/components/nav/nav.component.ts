import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material';
// import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { menu, MenuItem } from './menu';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  public menu: MenuItem[];
  public logged: boolean;
  public language: string;
  public languages: string[];
  @ViewChild(MatMenuTrigger) public trigger: MatMenuTrigger;
  private subscription: Subscription;

  /**
   * Constructor NavComponent
   */
  public constructor(private authService: AuthService, private languageService: LanguageService) {
    this.menu = menu;
    this.language = this.languageService.getLanguage();
    this.languages = this.languageService.getLanguages();
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

  /**
   * On select language
   *
   * @param {string} language
   */
  public onSelectLanguage(language: string): void {
    this.language = language;
    this.languageService.setLanguage(language);
  }
}


import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { menu, MenuItem } from './menu';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  public menu: MenuItem[];
  public logged: boolean;
  private subscription: Subscription;
  public language: string;
  public languages: string[];
  @ViewChild(MatMenuTrigger) public trigger: MatMenuTrigger;

  /**
   * Constructor NavComponent
   */
  public constructor(private authService: AuthService, private languageService: LanguageService) {
    this.menu = menu;
    this.language = LanguageService.getLanguage();
    this.languages = LanguageService.getLanguages();
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


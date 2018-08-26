import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { environment } from '../../../../environments/environment';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor(private translate: TranslateService,
              private tokenService: TokenService) {
    this.translate.addLangs(environment.languages);
    this.translate.setDefaultLang(environment.defaultLanguage);
    this.translate.use(this.tokenService.getLang());
  }
}

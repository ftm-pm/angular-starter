import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';


import * as translationEn from '../../../assets/i18n/en.json';
import * as translationRu from '../../../assets/i18n/ru.json';

const TRANSLATIONS = {
  en: translationEn,
  ru: translationRu
};

export class TranslateServerLoader implements TranslateLoader {
  constructor(private transferState: TransferState) {
  }
  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      const jsonData = TRANSLATIONS[lang];
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);
      observer.next(jsonData);
      observer.complete();
    });
  }
}

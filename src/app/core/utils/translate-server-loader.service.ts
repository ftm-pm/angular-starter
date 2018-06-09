import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';

declare var require: any;
import * as fs from 'fs';
import { join } from 'path';

export class TranslateServerLoader implements TranslateLoader {
  /**
   * @param {string} prefix
   * @param {string} suffix
   * @param {TransferState} transferState
   */
  public constructor(private prefix: string = 'i18n',
              private suffix: string = '.json',
              private transferState: TransferState) {
  }

  /**
   * @param {string} lang
   * @returns {Observable<any>}
   */
  public getTranslation(lang: string): Observable<any> {
    return Observable.create(observer => {
      const assets_folder = join(process.cwd(), 'dist', 'browser', this.prefix);

      const jsonData = JSON.parse(fs.readFileSync(`${assets_folder}/${lang}${this.suffix}`, 'utf8'));

      // Here we save the translations in the transfer-state
      const key: StateKey<number> = makeStateKey<number>('transfer-translate-' + lang);
      this.transferState.set(key, jsonData);

      observer.next(jsonData);
      observer.complete();
    });
  }
}

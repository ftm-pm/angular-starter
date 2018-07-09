import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/internal/operators';

import { environment } from '../../../environments/environment';
import { Image } from '../models/image';
import { RestService } from './rest.service';

@Injectable()
export class ImageService extends RestService<Image> {
  /**
   * @inheritDoc
   */
  public constructor(protected httpClient: HttpClient) {
    super(`${environment.api.path}/${environment.api.prefix}/media/images`);
  }

  /**
   * @template T
   * @param {FormData} formData
   * @returns {Observable<any>}
   */
  public postData(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    const options = {headers: headers};

    return this.httpClient.post(this.url, formData, options)
      .pipe(catchError(this.handleError()));
  }
}

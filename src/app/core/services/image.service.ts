import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { RestService } from './rest.service';
import { Image } from '../entities/image';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ImageService extends RestService<Image> {
  /**
   * @inheritDoc
   */
  public constructor(protected httpClient: HttpClient) {
    super(`${environment.api.path}/api/media/images`);
  }

  /**
   * @template T
   * @param {FormData} formData
   * @returns {Observable<T>}
   */
  public postData(formData: FormData): Observable<any> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    const options = {headers: headers};

    return this.httpClient.post(this.url, formData, options)
      .catch(this.handleError);
  }
}

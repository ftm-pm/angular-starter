import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { RestEntity } from '../entities/rest-entity';

/**
 * RestService
 */
export abstract class RestService<T extends RestEntity> {
  /**
   * Api path
   */
  protected url: string;

  /**
   * Headers
   */
  protected headers: HttpHeaders;

  /**
   * HttpClient
   */
  protected httpClient: HttpClient;

  /**
   * @param {string} url
   */
  constructor(url ?: string) {
    this.url = url;
    this.headers = new HttpHeaders();
  }

  /**
   * @template T
   * @param entity
   * @returns {T}
   */
  public transform(entity: any): T {
    return entity;
  }

  /**
   * @template T
   * @param {T} entity
   * @returns {any}
   */
  public reverseTransform(entity: T): any {
    return entity;
  }

  /**
   * @template T
   * @param {any} search
   * @returns {Observable<T[]>}
   */
  public get(search: any = {}): Observable<T[]> {
    const url = this.url;
    let params = new HttpParams();

    for (const propKey in search) {
      if (propKey !== 'sort') {
        if (search.hasOwnProperty(propKey) && search[propKey]) {
          params = params.append(propKey, search[propKey].toString());
        }
      }
    }
    if (search['sort']) {
      search['sort'].forEach(sort => {
        params = params.append(`_sort[${sort.name}]`, sort.value);
      });
    }
    const options = {headers: this.headers, params: params};

    return this.httpClient.get<HttpResponse<T[]>>(url, options)
      .map((data: HttpResponse<T[]>) => this.extractData(data))
      .catch(this.handleError);
  }

  /**
   * @template T
   * @param {number} id
   * @returns {Observable<T>}
   */
  public getOne(id: number): Observable<T> {
    const url = `${this.url}/${id}`;
    const params = new HttpParams();
    const options = {headers: this.headers, params: params};

    return this.httpClient.get<HttpResponse<T>>(url, options)
      .map((data: HttpResponse<T>) => this.extractData(data))
      .catch(this.handleError);
  }

  /**
   * Return entity by field
   *
   * @template T
   * @param {string} field
   * @returns {Observable<T extends RestEntity>}
   */
  public getOneByField(field: any): Observable<T> {
    const url = `${this.url}/${field.name}/${field.value}`;
    const params = new HttpParams();
    const options = {headers: this.headers, params: params};

    return this.httpClient.get<HttpResponse<T>>(url, options)
      .catch(this.handleError);
  }

  /**
   * @template T
   * @param {T} entity
   * @returns {Observable<T>}
   */
  public post(entity: T): Observable<T> {
    const transformedEntity: any = this.reverseTransform(entity);
    const options = {headers: this.headers};

    return this.httpClient.post<HttpResponse<T>>(this.url, JSON.stringify(transformedEntity), options)
      .map(data => this.extractData(data))
      .catch(this.handleError);
  }

  /**
   * @template T
   * @param {FormData} formData
   * @returns {Observable<T>}
   */
  public postData(formData: FormData): Observable<T> {
    const headers = new HttpHeaders({
      'enctype': 'multipart/form-data'
    });
    const options = {headers: headers};

    return this.httpClient.post(this.url, formData, options)
      .catch(this.handleError);
  }

  /**
   * @template T extends RestEntity
   * @param {T} entity
   * @returns {Observable<void>}
   */
  public patch(entity: T): Observable<void> {
    const url = `${this.url}/${entity.id}`;
    const transformedEntity: any = this.reverseTransform(entity);
    const options = {headers: this.headers};

    return this.httpClient.patch(url, JSON.stringify(transformedEntity), options)
      .catch(this.handleError);
  }

  /**
   * @param {number} id
   * @returns {Observable<ArrayBuffer>}
   */
  public delete(id: number): Observable<ArrayBuffer> {
    const url = `${this.url}/${id}`;
    const options = {headers: this.headers};

    return this.httpClient.delete(url, options)
      .catch(this.handleError);
  }

  /**
   * @param {HttpResponse<T[] | T> | HttpEvent<HttpResponse<T[] | T>> | any} responseData
   * @returns {any}
   */
  protected extractData(responseData: HttpResponse<T[] | T> | HttpEvent<HttpResponse<T[] | T>> | any): any {
    let data: T[] | T;

    if (Array.isArray(responseData)) {
      data = responseData.map(entity => this.transform(entity));
    } else {
      data = this.transform(responseData);
    }

    return data;
  }

  /**
   * @param {HttpErrorResponse | any} error
   * @returns {ErrorObservable}
   */
  protected handleError(error: HttpErrorResponse | any) {
    let errMsg: any, body: any;
    if (error instanceof HttpErrorResponse) {
      body = error;
    } else {
      body = JSON.parse(error) || error || '';
    }

    if (typeof body.error === 'string') {
      let err = JSON.parse(body.error);
      if (err.error) {
        err = err.error;
      }
      if (err.message) {
        errMsg = err.message;
      } else if (err.exception) {
        if (err.exception.length > 0) {
          errMsg = `${err.exception[0].message}`;
        } else {
          errMsg = `${err.exception.message}`;
        }
      } else {
        errMsg = err.toString();
      }
    } else if (body.message) {
      errMsg = body.message;
    } else {
      errMsg = body.toString();
    }

    return Observable.throw(errMsg);
  }
}

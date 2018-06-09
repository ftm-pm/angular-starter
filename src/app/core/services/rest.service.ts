import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';

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
  public constructor(url ?: string) {
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
      .pipe(
        map((data: HttpResponse<T[]>) => this.extractData(data)),
        catchError(this.handleError())
      );
  }

  /**
   * @template T
   * @param {number} id
   * @param search
   * @returns {Observable<T>}
   */
  public getOne(id: number, search: any = {}): Observable<T> {
    const url = `${this.url}/${id}`;
    let params = new HttpParams();
    for (const propKey in search) {
      if (search.hasOwnProperty(propKey) && search[propKey]) {
        params = params.append(propKey, search[propKey].toString());
      }
    }
    const options = {headers: this.headers, params: params};

    return this.httpClient.get<HttpResponse<T>>(url, options)
      .pipe(
        map((data: HttpResponse<T>) => this.extractData(data)),
        catchError(this.handleError())
      );
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

    return this.httpClient.get<T>(url, options)
      .pipe(
        catchError(this.handleError())
      );
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
      .pipe(
        map(data => this.extractData(data)),
        catchError(this.handleError())
      );
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

    return this.httpClient.post<T>(this.url, formData, options)
      .pipe(
        catchError(this.handleError())
      );
  }

  /**
   * @template T extends RestEntity
   * @param {T} entity
   * @returns {Observable<any>}
   */
  public patch(entity: T): Observable<any> {
    const url = `${this.url}/${entity.id}`;
    const transformedEntity: any = this.reverseTransform(entity);
    const options = {headers: this.headers};

    return this.httpClient.patch<T>(url, JSON.stringify(transformedEntity), options)
      .pipe(
        catchError(this.handleError())
      );
  }

  /**
   * @template T extends RestEntity
   * @param {T} entity
   * @returns {Observable<any>}
   */
  public put(entity: T): Observable<any> {
    const url = `${this.url}/${entity.id}`;
    const transformedEntity: any = this.reverseTransform(entity);
    const options = {headers: this.headers};

    return this.httpClient.put<T>(url, JSON.stringify(transformedEntity), options).pipe(
      catchError(this.handleError())
    );
  }

  /**
   * @param {number} id
   * @returns {Observable<any>}
   */
  public delete(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    const options = {headers: this.headers};

    return this.httpClient.delete<T>(url, options).pipe(
      catchError(this.handleError())
    );
  }

  /**
   * @param any responseData
   * @returns {any}
   */
  protected extractData(responseData: any): any {
    let data: any;

    if (responseData['@type'] === 'hydra:Collection') {
      data = responseData['hydra:member'].map(entity => this.transform(entity));
    } else {
      data = this.transform(responseData);
    }

    return data;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @template T extends RestEntity
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

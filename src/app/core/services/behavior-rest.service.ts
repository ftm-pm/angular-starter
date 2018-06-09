import { HttpResponse } from '@angular/common/http';
import { sha3_256 } from 'js-sha3';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/internal/operators';

import { RestEntity } from '../entities/rest-entity';
import { RestService } from './rest.service';

export interface BehaviorRestOptions {
  lazyLoad ?: boolean;
  reload: boolean;
  showSpinner ?: boolean;
  subload ?: any;
  noreload ?: boolean;
}

export interface BehaviorRestItem<T> {
  query: any;
  entitiesId: number[];
  collection: T[];
}

/**
 * BehaviorRestService
 */
export abstract class BehaviorRestService<T extends RestEntity> extends RestService<T> {
  protected autoreload: boolean = true;
  protected entities: BehaviorSubject<any>[] = [];
  protected collections: BehaviorSubject<BehaviorRestItem<T>>[] = [];

  /**
   * Constructor BehaviorRestService
   *
   * @param {string} url
   */
  protected constructor(protected url: string) {
    super(url);
  }

  /**
   * Return hash for key
   *
   * @param key
   * @returns {string}
   */
  public static getHash(key: any): string {
    return sha3_256(JSON.stringify(key));
  }

  /**
   * @param search
   * @param {BehaviorRestOptions} options
   * @returns {Observable<BehaviorRestItem<T>>}
   */
  public getEntities(search: any = {}, options: BehaviorRestOptions = <BehaviorRestOptions>{}): Observable<T[]> {
    const behaviorEntities = this.getEntity(BehaviorRestService.getHash(search));
    if (!options.lazyLoad && (options.reload || !behaviorEntities.getValue())) {
      this.get(search).subscribe(entities => this.setCollection(search, <any>entities));
    }

    return behaviorEntities.asObservable();
  }

  /**
   * @param {number} id
   * @param search
   * @param {BehaviorRestOptions} options
   * @returns {Observable<T extends RestEntity>}
   */
  public getOneEntity(id: number, search: any = {}, options: BehaviorRestOptions = <BehaviorRestOptions>{}): Observable<T> {
    const behaviorEntity = this.getEntity(BehaviorRestService.getHash(id));
    if (!options.lazyLoad && (options.reload || !behaviorEntity.getValue())) {
      this.getOne(id, search).subscribe((entity: T) => this.setEntity(entity));
    }

    return behaviorEntity.asObservable();
  }

  /**
   * Add new entity
   *
   * @template T
   * @param {T} entity
   * @param {BehaviorRestOptions} behaviorOptions
   * @returns {Observable<T extends RestEntity>}
   */
  public postEntity(entity: T, behaviorOptions: BehaviorRestOptions = <BehaviorRestOptions>{}): Observable<T> {
    const transformedEntity: any = this.reverseTransform(entity);
    const options = { headers: this.headers };

    return this.httpClient.post<T>(this.url, JSON.stringify(transformedEntity), options)
      .pipe(
        map(data => {
          const transformEntity: T = this.extractData(data);
          if (!behaviorOptions.noreload) {
            this.setEntity(transformEntity);
            if (this.autoreload && !behaviorOptions.noreload) {
              this.updateCollectionsAfterPost(transformEntity.id);
            } else {
              this.collections = [];
            }
          }

          return transformEntity;
        }),
       catchError(this.handleError())
      );
  }


  /**
   * @param {T} entity
   * @param {BehaviorRestOptions} behaviorOptions
   * @returns {Observable<any>}
   */
  public patchEntity(entity: T, behaviorOptions: BehaviorRestOptions = <BehaviorRestOptions>{}): Observable<any> {
    const url = `${this.url}/${entity.id}`;
    const transformedEntity: any = this.reverseTransform(entity);
    const options = { headers: this.headers };

    return this.httpClient.patch<T>(url, JSON.stringify(transformedEntity), options)
      .pipe(
        map(data => {
          const transformEntity: T = this.extractData(data);
          if (!behaviorOptions.noreload) {
            this.getOne(entity.id).subscribe(response => {
              this.setEntity(response);
              if (this.autoreload) {
                this.updateCollectionsAfterPatch(response.id);
              }
            });
          } else {
            this.collections = [];
          }

          return transformEntity;
        }),
        catchError(this.handleError())
      );
  }

  /**
   * @param {T} entity
   * @param {BehaviorRestOptions} behaviorOptions
   * @returns {Observable<any>}
   */
  public putEntity(entity: T, behaviorOptions: BehaviorRestOptions = <BehaviorRestOptions>{}): Observable<any> {
    const url = `${this.url}/${entity.id}`;
    const transformedEntity: any = this.reverseTransform(entity);
    const options = { headers: this.headers };

    return this.httpClient.put(url, JSON.stringify(transformedEntity), options)
      .pipe(
        map(data => {
          const transformEntity: T = this.extractData(data);
          if (!behaviorOptions.noreload) {
            this.getOne(entity.id).subscribe(response => {
              this.setEntity(response);
              if (this.autoreload && !behaviorOptions.noreload) {
                this.updateCollectionsAfterPut(response.id);
              }
            });
          } else {
            this.collections = [];
          }

          return transformEntity;
        }),
        catchError(this.handleError())
      );
  }


  /**
   * @param {number} id
   * @param {BehaviorRestOptions} behaviorOptions
   * @returns {Observable<any>}
   */
  public delete(id: number, behaviorOptions: BehaviorRestOptions = <BehaviorRestOptions>{}): Observable<any> {
    const url = `${this.url}/${id}`;
    const options = { headers: this.headers };

    return this.httpClient.delete(url, options)
      .pipe(
        map(data => {
          const transformEntity: T = this.extractData(data);
          if (!behaviorOptions.noreload && this.autoreload) {
            this.updateCollectionsAfterDelete(id);
          } else {
            this.collections = [];
          }

          return transformEntity;
        }),
        catchError(this.handleError())
      );
  }

  /////////////////////////////

  /**
   * Return BehaviorSubject<T>
   *
   * @template T
   * @param {string} hash
   * @returns {BehaviorSubject<T extends RestEntity>}
   */
  protected getEntity(hash: string): BehaviorSubject<any> {
    if (this.entities[hash] === undefined) {
      this.entities[hash] = new BehaviorSubject<T>(undefined);
    }

    return this.entities[hash];
  }

  /**
   * Set BehaviorSubject element
   *
   * @template T
   * @param {T} entity
   */
  protected setEntity(entity: T): void {
    const hash = BehaviorRestService.getHash(entity.id);
    this.getEntity(hash).next(entity);
  }

  /**
   * Return BehaviorSubject<T>
   *
   * @template T
   * @param {string} hash
   * @returns {BehaviorSubject<BehaviorRestItem<T>>}
   */
  protected getCollection(hash: string): BehaviorSubject<BehaviorRestItem<T>> {
    if (this.collections[hash] === undefined) {
      this.collections[hash] = new BehaviorSubject<BehaviorRestItem<T>>(undefined);
    }

    return this.collections[hash];
  }

  /**
   * Set collecton entities
   *
   * @param query
   * @param {T[]} entities
   */
  protected setCollection(query: any, entities: T[]): void {
    const hash = BehaviorRestService.getHash(query);
    const collection: BehaviorSubject<BehaviorRestItem<T>> = this.getCollection(hash);
    const collectionItem: BehaviorRestItem<T> = collection.getValue();

    const entitiesId: number[] = entities.map(entity => {
      this.setEntity(entity);
      return entity.id;
    });

    if (!collectionItem || collectionItem.entitiesId.length !== entitiesId.length ||
      !collectionItem.entitiesId.every((v, i) => v === entitiesId[i])) {
      collection.next(<BehaviorRestItem<T>>{
        query: query,
        entitiesId: entitiesId,
        collection: entities
      });
      this.getEntity(hash).next(entities);
    }
  }

  /**
   * Update collections entities after add entity
   *
   * @param {number} entityId
   */
  protected updateCollectionsAfterPost(entityId: number): void {
    for (const hash in this.collections) {
      if (this.collections.hasOwnProperty(hash)) {
        const collection: BehaviorSubject<BehaviorRestItem<T>> = this.collections[hash];
        const restItem: BehaviorRestItem<T> = collection.getValue();
        if (restItem) {
          this.get(restItem.query).subscribe(response => {
            if ((<T[]>response).filter((entity: RestEntity) => entity.id === entityId).length > 0) {
              this.setCollection(restItem.query, <any>response);
            }
          });
        }
      }
    }
  }

  /**
   * Update collections entities after update entity
   *
   * @param {number} entityId
   */
  protected updateCollectionsAfterPut(entityId: number): void {
    for (const hash in this.collections) {
      if (this.collections.hasOwnProperty(hash)) {
        const collection: BehaviorSubject<BehaviorRestItem<T>> = this.collections[hash];
        const restItem: BehaviorRestItem<T> = collection.getValue();
        if (restItem && restItem.entitiesId.filter(entity => entity === entityId).length > 0) {
          const collectionItems: T[] = restItem.collection;
          collectionItems.forEach((entity: T, index) => {
            if (entity.id === entityId) {
              restItem.collection[index] = this.getEntity(BehaviorRestService.getHash(entity.id)).getValue();
            }
          });
          collection.next(restItem);
          this.getEntity(hash).next(restItem.collection);
        }
      }
    }
  }

  /**
   * Update collections entities after patch entity
   *
   * @param {number} entityId
   */
  protected updateCollectionsAfterPatch(entityId: number): void {
    this.updateCollectionsAfterPut(entityId);
  }

  /**
   * Update collections entities after remove entity
   *
   * @param {number} entityId
   */
  protected updateCollectionsAfterDelete(entityId: number): void {
    for (const hash in this.collections) {
      if (this.collections.hasOwnProperty(hash)) {
        const collection: BehaviorSubject<BehaviorRestItem<T>> = this.collections[hash];
        const restItem: BehaviorRestItem<T> = collection.getValue();
        const collectionItems = restItem.collection.filter((entity: RestEntity) => entity.id !== entityId);
        collection.next(<BehaviorRestItem<T>>{
          query: restItem.query,
          entitiesId: restItem.entitiesId.filter(entity => entity !== entityId),
          collection: collectionItems,
        });
        this.getEntity(hash).next(collectionItems);
      }
    }
  }
}

import { Type } from '@angular/core/core';

export enum API_BASE {
  EVE_COMMANDER = '/',
  EVE_ONLINE_AUTH = 'https://login.eveonline.com/',
  EVE_COMMANDER_AUTH_CALLBACK = '/auth/callback/',
  EVE_ONLINE_IMAGE_BASE = 'https://imageserver.eveonline.com/'
}

export interface ResourceInterface<T> {
  cardComponent?: Type<any>;
  listComponent?: Type<any>;
  data: T;
}

export class BaseService {
  protected resourceAttributes: {[key: string]: Type<any>} = {};

  protected applyResourceAttributes<T>(object: T): T {
    return Object.assign(object, this.resourceAttributes);
  }

  protected objectToResource<T>(item: T): ResourceInterface<T> {
    const resource: ResourceInterface<T> = {
      data: item
    };

    return this.applyResourceAttributes(resource);
  }

  protected objectArrayToResourceArray<T>(items: Array<T>): ResourceInterface<T>[] {
    return items.map((item: T) => {
      return this.objectToResource(item);
    });
  }
}

import {Type} from '@angular/core/core';

export enum API_BASE {
  EVE_COMMANDER = '/',
  EVE_ONLINE_AUTH = 'https://login.eveonline.com/',
  EVE_COMMANDER_AUTH_CALLBACK = '/auth/callback/',
  EVE_ONLINE_IMAGE_BASE = 'https://imageserver.eveonline.com/'
}

export interface ResourceInterface<T> {
  cardComponent: Type<any>;
  listComponent: Type<any>;
  data: T;
}

export class BaseService {
  protected defaultAttributes: object = {};

  protected applyDefaultAttributes(object: object) {
    return Object.assign(object, this.defaultAttributes);
  }
}

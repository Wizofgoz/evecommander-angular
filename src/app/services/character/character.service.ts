import { Injectable } from '@angular/core';
import { API_BASE, BaseService, ResourceInterface } from '../base.service';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { Observable } from 'rxjs/Observable';
import { CharacterCardComponent } from '../../components/card/cards';
import { OAuth2Token } from '../eve-auth/eve-auth.service';
import { ApiService } from '../api/api.service';

export class Character {
  cardComponent = CharacterCardComponent;
  id: string;
  eve_id: number;
  name: string;
  token: OAuth2Token;
  created_at: Moment;
  updated_at: Moment;
}

@Injectable()
export class CharacterService extends BaseService {
  protected defaultAttributes = {
    cardComponent: CharacterCardComponent
  };

  constructor(private router: Router, private api: ApiService) {
    super();
  }

  /**
   * Get array of characters the logged in user has registered
   *
   * @returns {Observable<Character[]>}
   */
  getCharacters() {
    return this.api.all<ResourceInterface<Character>[]>(API_BASE.EVE_COMMANDER + '/characters');
  }
}

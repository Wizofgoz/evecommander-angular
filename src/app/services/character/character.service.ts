import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';
import { API_BASE, BaseService } from '../base.service';
import { Router } from '@angular/router';
import { Moment } from 'moment';
import { Observable } from 'rxjs/Observable';
import { CharacterCardComponent } from '../../components/card/cards/character/character.card.component';
import { EchoService } from 'angular-laravel-echo';

export interface OAuth2Token {
  access_token: string;
  refresh_token: string;
  expires: Moment;
}

export interface Character {
  id: string;
  eve_id: number;
  name: string;
  token: OAuth2Token;
  created_at: Moment;
  updated_at: Moment;
}

@Injectable()
export class CharacterService extends BaseService implements OnInit {
  protected defaultAttributes = {
    cardComponent: CharacterCardComponent
  };
  protected clientID: number;
  protected scopes: string[];

  constructor(private router: Router, private http: HttpClient, private echo: EchoService) {
    super();
  }

  ngOnInit() {
    // get client ID and required scopes from API
    this.http.get<{client_id: number, scopes: string[]}>(API_BASE.EVE_COMMANDER + 'settings/sso').subscribe(response => {
      this.clientID = response.client_id;
      this.scopes = response.scopes;
    });
  }

  /**
   * Opens new window to SSO to authorize a character
   *
   * @returns {{windowRef: Window; observer: Observable<Character>}}
   */
  authorizeCharacter() {
    const windowRef = window.open(this.getSSOURL());
    return {
      windowRef,
      observer: this.echo.notification<Character>('character-auth')
    };
  }

  /**
   * Get URL for the EVE SSO including extras
   *
   * @returns {string}
   */
  getSSOURL() {
    return API_BASE.EVE_ONLINE_AUTH + 'oauth/authorize/?response_type=code&redirect_uri='
      + API_BASE.EVE_COMMANDER_AUTH_CALLBACK + '&client_id=' + this.clientID + '&scope=' + this.scopes.join(',');
  }

  /**
   * Get array of characters the logged in user has registered
   *
   * @returns {Observable<Character[]>}
   */
  getCharacters() {
    return this.http.get<Character[]>(API_BASE.EVE_COMMANDER + '/characters').map((characters: Character[]) => {
      return characters.map((item: Character) => {
        return this.applyDefaultAttributes(item);
      });
    });
  }

  /**
   * Get URL for the given character at a given size
   *
   * @param {number} character_id
   * @param {number} size
   * @returns {string}
   */
  getCharacterImageURL(character_id: number, size: 32|64|128|256|512|1024) {
    return API_BASE.EVE_ONLINE_IMAGE_BASE + 'Character/' + character_id + '_' + size + '.jpg';
  }

  /**
   * Refresh a character's Eve Online token
   *
   * @param character_id
   * @returns {Observable<OAuth2Token>}
   */
  refreshToken(character_id) {
    return this.http.get<OAuth2Token>(API_BASE.EVE_COMMANDER + '/characters/' + character_id + '/refresh');
  }
}

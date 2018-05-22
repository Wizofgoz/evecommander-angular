import { Injectable, OnInit } from '@angular/core';
import { Character } from '../character/character.service';
import {API_BASE, BaseService, ResourceInterface} from '../base.service';
import { EchoService } from 'angular-laravel-echo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Moment } from 'moment';

export interface OAuth2Token {
  access_token: string;
  refresh_token: string;
  expires: Moment;
}

@Injectable()
export class EveAuthService extends BaseService implements OnInit {
  protected clientID: number;
  protected scopes: string[];
  protected authenticatedCharacters: Map<number, ResourceInterface<Character>> = new Map<number, ResourceInterface<Character>>();

  constructor(private http: HttpClient, private echo: EchoService) {
    super();
  }

  /**
   * Get client ID and required scopes from API
   */
  ngOnInit() {
    this.http.get<{client_id: number, scopes: string[]}>(API_BASE.EVE_COMMANDER + 'settings/sso').subscribe(response => {
      this.clientID = response.client_id;
      this.scopes = response.scopes;
    });
  }

  getCharacter(character_eve_id: number): ResourceInterface<Character> {
    return this.authenticatedCharacters.get(character_eve_id);
  }

  setCharacter(character: ResourceInterface<Character>) {
    this.authenticatedCharacters.set(character.data.eve_id, character);
  }

  /**
   * Opens new window to SSO to authorize a character
   */
  authorizeCharacter() {
    const windowRef = window.open(this.getSSOURL());
    this.echo.notification<Character>('character-auth').subscribe((character: Character) => {
      this.setCharacter(this.objectToResource(character));
      windowRef.close();
    });
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
   * Refresh a character's Eve Online token
   *
   * @param character_eve_id
   */
  refreshToken(character_eve_id: number): Observable<OAuth2Token> {
    return Observable.create((observer: Observer<OAuth2Token>) => {
      this.http.get<OAuth2Token>(API_BASE.EVE_COMMANDER + '/characters/' + character_eve_id + '/refresh')
        .subscribe((token: OAuth2Token) => {
          const tempChar = this.getCharacter(character_eve_id);
          tempChar.data.token = token;
          this.setCharacter(tempChar);
          observer.next(token);
        });
    });
  }

  /**
   * Check if the token for the character is valid, refresh it if not, and return the token
   *
   * @param {number} character_eve_id
   * @returns {Observable<OAuth2Token>}
   */
  getToken(character_eve_id: number): Observable<OAuth2Token> {
    if (!this.authenticatedCharacters.has(character_eve_id)) {
      throw Error('Character with ID ' + character_eve_id + 'does not exist in the list of authenticated characters');
    }

    const char = this.getCharacter(character_eve_id);

    return Observable.create((observer: Observer<OAuth2Token>) => {
      if (char.data.token.expires.isBefore()) {
        this.refreshToken(character_eve_id).subscribe((token: OAuth2Token) => {
          observer.next(token);
        });
      } else {
        observer.next(char.data.token);
      }
    });
  }
}

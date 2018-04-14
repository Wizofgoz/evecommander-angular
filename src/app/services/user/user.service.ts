import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Moment } from 'moment';
import { EchoService } from 'angular-laravel-echo';
import { Observable } from 'rxjs/Observable';
import { API_BASE } from '../base.service';

export interface User {
  id: string;
  email: string;
  created_at: Moment;
  updated_at: Moment;
  client_id: number;
}

@Injectable()
export class UserService {

  constructor(private auth: AuthService, private http: HttpClient, private echo: EchoService) { }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(API_BASE.EVE_COMMANDER + '/user/' + id);
  }

  getLoggedInUser(): User {
    if (!localStorage.getItem('user')) {
      this.http.get<User>(API_BASE.EVE_COMMANDER + '/auth/user').subscribe(user => {
        localStorage.setItem('user', JSON.stringify(user));
      });
    }

    return JSON.parse(localStorage.getItem('user'));
  }

  joinPrivateChannel(): EchoService {
    return this.echo.login({}, this.getLoggedInUser().id);
  }
}

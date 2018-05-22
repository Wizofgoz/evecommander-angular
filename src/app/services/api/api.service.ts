import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { API_BASE, BaseService, ResourceInterface } from '../base.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService extends BaseService {

  constructor(private auth: AuthService, private http: HttpClient) {
    super();
  }

  all<T>(path: string): Observable<ResourceInterface<T>[]> {
    return this.http.get<ResourceInterface<T>[]>(API_BASE.EVE_COMMANDER + path).map((items: ResourceInterface<T>[]) => {
      return this.objectArrayToResourceArray(items);
    });
  }

  find<T>(path: string, id: number): Observable<ResourceInterface<T>> {
    return this.http.get<ResourceInterface<T>>(API_BASE.EVE_COMMANDER + path + '/' + id).map((item: ResourceInterface<T>) => {
      return this.objectToResource(item);
    });
  }

  create<T>(path: string, object: T): Observable<ResourceInterface<T>> {
    return this.http.post<ResourceInterface<T>>(API_BASE.EVE_COMMANDER + path, object).map((item: ResourceInterface<T>) => {
      return this.objectToResource(item);
    });
  }

  update<T>(path: string, id: number, object: T): Observable<ResourceInterface<T>> {
    return this.http.put(API_BASE.EVE_COMMANDER + path + '/' + id, object).map((item: ResourceInterface<T>) => {
      return this.objectToResource(item);
    });
  }
}

import { EventEmitter } from '@angular/core';

export interface CardComponent<T> {
  resource: T;
  select?: EventEmitter<any>;
  delete?: EventEmitter<any>;
  edit?: EventEmitter<any>;
}

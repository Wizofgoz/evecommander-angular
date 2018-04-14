import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE } from '../base.service';

export interface Membership {
  id: string;
  owner_id: number;
  owner_type: MembershipOwnerTypes;
  member_id: number;
  member_type: MembershipMemberTypes;
  membership_level_id: number;
  notes: string;
  added_by: number;
  last_updated_by: number;
  created_at: string;
  updated_at: string;
}

export enum MembershipOwnerTypes {
  corporation = 'App\\Corporation',
  alliance = 'App\\Alliance',
  coalition = 'App\\Coalition'
}

export enum MembershipMemberTypes {
  character = 'App\\Character',
  corporation = 'App\\Corporation',
  alliance = 'App\\Alliance',
  coalition = 'App\\Coalition'
}

@Injectable()
export class MembershipService {

  constructor(private http: HttpClient) { }

  getMemberships(character_id?: number) {
    return this.http.get(API_BASE.EVE_COMMANDER + (character_id ? 'characters/' + character_id + '/' : '') + 'memberships');
  }
}

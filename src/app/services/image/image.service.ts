import { Injectable } from '@angular/core';
import { API_BASE } from '../base.service';

@Injectable()
export class ImageService {

  constructor() { }

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
   * Get URL for the given corporation at a given size
   *
   * @param {number} corporation_id
   * @param {number} size
   * @returns {string}
   */
  getCorporationImageURL(corporation_id: number, size: 32|64|128|256) {
    return API_BASE.EVE_ONLINE_IMAGE_BASE + 'Corporation/' + corporation_id + '_' + size + '.jpg';
  }

  /**
   * Get URL for the given alliance at a given size
   *
   * @param {number} alliance_id
   * @param {number} size
   * @returns {string}
   */
  getAllianceImageURL(alliance_id: number, size: 32|64|128|256) {
    return API_BASE.EVE_ONLINE_IMAGE_BASE + 'Alliance/' + alliance_id + '_' + size + '.jpg';
  }
}

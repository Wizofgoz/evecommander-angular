import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  CharacterService,
  CorporationService,
  GetAlliancesAllianceIdOk,
  GetCharactersCharacterIdOk,
  GetCorporationsCorporationIdOk
} from '../../../../eve-online-angular-client';
import { CardComponent } from '../card.component';
import { CacheService } from '../../../../services/cache/cache.service';
import { ImageService } from '../../../../services/image/image.service';

@Component({
  selector: 'app-alliance-card',
  templateUrl: './alliance.card.component.html',
  styleUrls: ['./alliance.card.component.css']
})
export class AllianceCardComponent implements OnInit {
  @Input() data: CardComponent<GetAlliancesAllianceIdOk>;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  founderCharacter: GetCharactersCharacterIdOk;
  founderCorporation: GetCorporationsCorporationIdOk;
  executor: GetCorporationsCorporationIdOk;
  imageURL: string;

  constructor(private corporationService: CorporationService,
              private characterService: CharacterService,
              private imageService: ImageService,
              private cache: CacheService) { }

  ngOnInit() {
    this.imageURL = this.imageService.getAllianceImageURL(this.data.resource_id, 32);

    this.cache.get('character' + this.data.resource.creatorId, this.characterService.getCharactersCharacterId(this.data.resource.creatorId))
      .subscribe((creator: GetCharactersCharacterIdOk) => {
        this.founderCharacter = creator;
      });

    this.cache.get('corporation' + this.data.resource.creatorCorporationId,
      this.corporationService.getCorporationsCorporationId(this.data.resource.creatorCorporationId))
      .subscribe((creator: GetCorporationsCorporationIdOk) => {
        this.founderCorporation = creator;
      });

    this.cache.get('corporation' + this.data.resource.executorCorporationId,
      this.corporationService.getCorporationsCorporationId(this.data.resource.executorCorporationId))
      .subscribe((executor: GetCorporationsCorporationIdOk) => {
        this.executor = executor;
      });
  }

  onEdit() {
    this.edit.emit(this.data.resource_id);
  }

  onSelect() {
    this.select.emit(this.data.resource_id);
  }
}

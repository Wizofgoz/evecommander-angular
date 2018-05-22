import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CardComponent } from '../card.component';
import {
  AllianceService, CharacterService,
  GetAlliancesAllianceIdOk, GetCharactersCharacterIdOk,
  GetCorporationsCorporationIdOk
} from '../../../../eve-online-angular-client';
import { CacheService } from '../../../../services/cache/cache.service';
import { ImageService } from '../../../../services/image/image.service';

@Component({
  selector: 'app-corporation-card',
  templateUrl: './corporation.card.component.html',
  styleUrls: ['./corporation.card.component.css']
})
export class CorporationCardComponent implements OnInit {
  @Input() data: CardComponent<GetCorporationsCorporationIdOk>;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  alliance: GetAlliancesAllianceIdOk;
  ceo: GetCharactersCharacterIdOk;
  imageURL: string;

  constructor(private characterService: CharacterService,
              private allianceService: AllianceService,
              private imageService: ImageService,
              private cache: CacheService) { }

  ngOnInit() {
    this.imageURL = this.imageService.getCorporationImageURL(this.data.resource_id, 32);

    this.cache.get('character' + this.data.resource.ceoId, this.characterService.getCharactersCharacterId(this.data.resource.ceoId))
      .subscribe((ceo: GetCharactersCharacterIdOk) => {
        this.ceo = ceo;
      });

    this.cache.get('alliance' + this.data.resource.allianceId, this.allianceService.getAlliancesAllianceId(this.data.resource.allianceId))
      .subscribe((alliance: GetAlliancesAllianceIdOk) => {
        this.alliance = alliance;
      });
  }

  onEdit() {
    this.edit.emit(this.data.resource_id);
  }

  onSelect() {
    this.select.emit(this.data.resource_id);
  }
}

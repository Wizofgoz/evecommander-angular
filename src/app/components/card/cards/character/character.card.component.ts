import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CardComponent } from '../card.component';
import { CharacterService } from '../../../../services/character/character.service';
import {
  CharacterService,
  CorporationService,
  GetCharactersCharacterIdOk, GetCharactersCharacterIdSkillsOk,
  GetCorporationsCorporationIdOk, SkillsService
} from '../../../../eve-online-angular-client';
import { CacheService } from '../../../../services/cache/cache.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character.card.component.html',
  styleUrls: ['./character.card.component.css']
})
export class CharacterCardComponent implements OnInit {
  @Input() data: CardComponent<GetCharactersCharacterIdOk>;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  imageURL: string;
  characterSkills: GetCharactersCharacterIdSkillsOk;
  corporation: GetCorporationsCorporationIdOk;

  constructor(private characterService: CharacterService,
              private eve: CharacterService,
              private corporationService: CorporationService,
              private skillsService: SkillsService,
              private cache: CacheService) { }

  ngOnInit() {
    this.imageURL = this.characterService.getCharacterImageURL(this.data.resource_id, 32);

    this.cache.get('characterSkills' + this.data.resource_id,
      this.skillsService.getCharactersCharacterIdSkills(this.data.resource_id))
      .subscribe((skills: GetCharactersCharacterIdSkillsOk) => {
        this.characterSkills = skills;
      });

    this.cache.get('corporation' + this.data.resource.corporationId,
      this.corporationService.getCorporationsCorporationId(this.data.resource.corporationId))
      .subscribe((corporation: GetCorporationsCorporationIdOk) => {
        this.corporation = corporation;
      });
  }

  onDelete() {
    this.delete.emit(this.data.resource_id);
  }

  onSelect() {
    this.select.emit(this.data.resource_id);
  }

  onEdit() {
    this.edit.emit(this.data.resource_id);
  }
}

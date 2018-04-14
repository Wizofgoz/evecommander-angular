import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CardComponent } from '../card.component';
import { Character, CharacterService } from '../../../../services/character/character.service';
import {
  CharacterService,
  CorporationService,
  GetCharactersCharacterIdOk, GetCharactersCharacterIdSkillsOk,
  GetCorporationsCorporationIdOk, SkillsService
} from '../../../../eve-online-angular-client';

@Component({
  selector: 'app-character.card',
  templateUrl: './character.card.component.html',
  styleUrls: ['./character.card.component.css']
})
export class CharacterCardComponent implements OnInit {
  @Input() data: CardComponent<Character>;
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  @Output() edit: EventEmitter<any> = new EventEmitter<any>();
  imageURL: string;
  character: GetCharactersCharacterIdOk;
  characterSkills: GetCharactersCharacterIdSkillsOk;
  corporation: GetCorporationsCorporationIdOk;

  constructor(private characterService: CharacterService,
              private eve: CharacterService,
              private corporationService: CorporationService,
              private skillsService: SkillsService) { }

  ngOnInit() {
    this.imageURL = this.characterService.getCharacterImageURL(this.data.resource.eve_id, 32);
    this.eve.getCharactersCharacterId(this.data.resource.eve_id).subscribe((character: GetCharactersCharacterIdOk) => {
      this.character = character;

      this.skillsService.getCharactersCharacterIdSkills(this.data.resource.eve_id)
        .subscribe((skills: GetCharactersCharacterIdSkillsOk) => {
          this.characterSkills = skills;
        });

      this.corporationService.getCorporationsCorporationId(character.corporationId)
        .subscribe((corporation: GetCorporationsCorporationIdOk) => {
          this.corporation = corporation;
        });
    });
  }

  onDelete() {
    this.delete.emit(this.data.resource.id);
  }

  onSelect() {
    this.select.emit(this.data.resource.id);
  }

  onEdit() {
    this.edit.emit(this.data.resource.id);
  }
}

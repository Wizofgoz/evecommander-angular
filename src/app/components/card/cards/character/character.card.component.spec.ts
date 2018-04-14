import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Character.CardComponent } from './character.card.component';

describe('Character.CardComponent', () => {
  let component: Character.CardComponent;
  let fixture: ComponentFixture<Character.CardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Character.CardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Character.CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

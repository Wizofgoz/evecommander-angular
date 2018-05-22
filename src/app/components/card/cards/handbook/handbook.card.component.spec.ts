import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandbookCardComponent } from './handbook.card.component';

describe('HandbookComponent', () => {
  let component: HandbookCardComponent;
  let fixture: ComponentFixture<HandbookCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HandbookCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandbookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

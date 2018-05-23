import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporationCardComponent } from './corporation.card.component';

describe('CorporationComponent', () => {
  let component: CorporationCardComponent;
  let fixture: ComponentFixture<CorporationCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorporationCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

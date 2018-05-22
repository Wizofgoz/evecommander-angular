import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FittingCardComponent } from './fitting.card.component';

describe('FittingComponent', () => {
  let component: FittingCardComponent;
  let fixture: ComponentFixture<FittingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FittingCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FittingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

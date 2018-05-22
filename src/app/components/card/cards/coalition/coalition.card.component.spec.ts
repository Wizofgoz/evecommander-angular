import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoalitionCardComponent } from './coalition.card.component';

describe('CoalitionComponent', () => {
  let component: CoalitionCardComponent;
  let fixture: ComponentFixture<CoalitionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoalitionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoalitionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed, async, inject } from '@angular/core/testing';

import { EveGuard } from './eve.guard';

describe('EveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EveGuard]
    });
  });

  it('should ...', inject([EveGuard], (guard: EveGuard) => {
    expect(guard).toBeTruthy();
  }));
});

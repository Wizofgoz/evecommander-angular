import { TestBed, inject } from '@angular/core/testing';

import { EveAuthService } from './eve-auth.service';

describe('EveAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EveAuthService]
    });
  });

  it('should be created', inject([EveAuthService], (service: EveAuthService) => {
    expect(service).toBeTruthy();
  }));
});

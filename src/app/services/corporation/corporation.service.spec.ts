import { TestBed, inject } from '@angular/core/testing';

import { CorporationService } from './corporation.service';

describe('CorporationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CorporationService]
    });
  });

  it('should be created', inject([CorporationService], (service: CorporationService) => {
    expect(service).toBeTruthy();
  }));
});

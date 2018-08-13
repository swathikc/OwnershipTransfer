import { TestBed, inject } from '@angular/core/testing';

import { DepositoryService } from './depository.service';

describe('DepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepositoryService]
    });
  });

  it('should be created', inject([DepositoryService], (service: DepositoryService) => {
    expect(service).toBeTruthy();
  }));
});

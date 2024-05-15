import { TestBed } from '@angular/core/testing';

import { RAMServiceService } from './ramservice.service';

describe('RAMServiceService', () => {
  let service: RAMServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RAMServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SepisodioService } from './sepisodio.service';

describe('SepisodioService', () => {
  let service: SepisodioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SepisodioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { SpersonagemService } from './spersonagem.service';

describe('SpersonagemService', () => {
  let service: SpersonagemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpersonagemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

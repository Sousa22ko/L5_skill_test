import { TestBed } from '@angular/core/testing';

import { SlocalizacaoService } from './slocalizacao.service';

describe('SlocalizacaoService', () => {
  let service: SlocalizacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlocalizacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

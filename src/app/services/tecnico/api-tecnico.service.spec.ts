import { TestBed } from '@angular/core/testing';

import { ApiTecnicoService } from './api-tecnico.service';

describe('ApiTecnicoService', () => {
  let service: ApiTecnicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiTecnicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

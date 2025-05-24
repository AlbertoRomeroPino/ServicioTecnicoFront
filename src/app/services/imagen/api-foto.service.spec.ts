import { TestBed } from '@angular/core/testing';

import { ApiFotoService } from './api-foto.service';

describe('ApiFotoService', () => {
  let service: ApiFotoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFotoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ErrorHanlderService } from './error-hanlder.service';

describe('ErrorHanlderService', () => {
  let service: ErrorHanlderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHanlderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

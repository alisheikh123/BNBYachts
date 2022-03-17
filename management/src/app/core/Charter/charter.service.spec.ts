import { TestBed } from '@angular/core/testing';

import { CharterService } from './charter.service';

describe('CharterService', () => {
  let service: CharterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { YachtSearchDataService } from './yacht-search-data.service';

describe('YachtSearchDataService', () => {
  let service: YachtSearchDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YachtSearchDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

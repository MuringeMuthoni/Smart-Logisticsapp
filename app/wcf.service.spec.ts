import { TestBed } from '@angular/core/testing';

import { WcfService } from './wcf.service';

describe('WcfService', () => {
  let service: WcfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WcfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

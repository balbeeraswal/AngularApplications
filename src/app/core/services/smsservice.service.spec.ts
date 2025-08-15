import { TestBed } from '@angular/core/testing';

import { SMSserviceService } from './smsservice.service';

describe('SMSserviceService', () => {
  let service: SMSserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SMSserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PosDevicesService } from './pos-devices.service';

describe('PosDevicesService', () => {
  let service: PosDevicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PosDevicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

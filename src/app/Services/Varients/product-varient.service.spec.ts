import { TestBed } from '@angular/core/testing';

import { ProductVarientService } from './product-varient.service';

describe('ProductVarientService', () => {
  let service: ProductVarientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductVarientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DateItemService } from './date-item.service';

describe('Service: DateItem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateItemService]
    });
  });

  it('should ...', inject([DateItemService], (service: DateItemService) => {
    expect(service).toBeTruthy();
  }));
});

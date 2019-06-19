/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DayCellService } from './day-cell.service';

describe('Service: DateItem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DayCellService]
    });
  });

  it('should ...', inject([DayCellService], (service: DayCellService) => {
    expect(service).toBeTruthy();
  }));
});

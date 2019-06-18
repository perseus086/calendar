/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ForecastService } from './forecast.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('Service: Forecast', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ForecastService]
    });
  });

  it('should ...', inject([ForecastService], (service: ForecastService) => {
    expect(service).toBeTruthy();
  }));
});

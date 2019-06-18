/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReminderListService } from './reminder-list.service';

describe('Service: ReminderList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReminderListService]
    });
  });

  it('should ...', inject([ReminderListService], (service: ReminderListService) => {
    expect(service).toBeTruthy();
  }));
});

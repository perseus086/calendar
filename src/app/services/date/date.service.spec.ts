/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DateService } from './date.service';

describe('Service: Date', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateService]
    });
  });

  it('should ...', inject([DateService], (service: DateService) => {
    expect(service).toBeTruthy();
  }));

  it('should return first day of the calendar', inject([DateService], (service: DateService) => {
    const today = new Date('2019-06-11');
    const firstDayOfCalendar = service.getFirstDayOfMonthOnCalendar(today);

    // 26 may -> 2019 04 26
    expect(firstDayOfCalendar.getFullYear()).toEqual(2019);
    expect(firstDayOfCalendar.getMonth()).toEqual(4);
    expect(firstDayOfCalendar.getDate()).toEqual(26);
    expect(firstDayOfCalendar.getDay()).toEqual(0);
  }));

  it('should return first day of the calendar even if needs previous year', inject([DateService], (service: DateService) => {
    const today = new Date('01/01/2019');
    const firstDayOfCalendar = service.getFirstDayOfMonthOnCalendar(today);

    // 30 dec 2018 -> 2018 30 11
    expect(firstDayOfCalendar.getFullYear()).toEqual(2018);
    expect(firstDayOfCalendar.getMonth()).toEqual(11);
    expect(firstDayOfCalendar.getDate()).toEqual(30);
    expect(firstDayOfCalendar.getDay()).toEqual(0);
  }));

  it('should return first day of the calendar even if it is fisrt day', inject([DateService], (service: DateService) => {
    const day = new Date('09/15/2019');
    const firstDayOfCalendar = service.getFirstDayOfMonthOnCalendar(day);

    // 01 sept -> 01 08
    expect(firstDayOfCalendar.getFullYear()).toEqual(2019);
    expect(firstDayOfCalendar.getMonth()).toEqual(8);
    expect(firstDayOfCalendar.getDate()).toEqual(1);
    expect(firstDayOfCalendar.getDay()).toEqual(0);
  }));

  it('should return last day of the calendar', inject([DateService], (service: DateService) => {
    const today = new Date('2019-06-11');
    const lastDayOfCalendar = service.getLastDayOfMonthOnCalendar(today);

    // 6 july -> 2019 06 06
    expect(lastDayOfCalendar.getFullYear()).toEqual(2019);
    expect(lastDayOfCalendar.getMonth()).toEqual(6);
    expect(lastDayOfCalendar.getDate()).toEqual(6);
    expect(lastDayOfCalendar.getDay()).toEqual(6);

  }));

  it('should return last day of the calendar even if needs to change year', inject([DateService], (service: DateService) => {
    const today = new Date('2018-12-15');
    const lastDayOfCalendar = service.getLastDayOfMonthOnCalendar(today);

    // 5 january -> 2018 00 05
    expect(lastDayOfCalendar.getFullYear()).toEqual(2019);
    expect(lastDayOfCalendar.getMonth()).toEqual(0);
    expect(lastDayOfCalendar.getDate()).toEqual(5);
    expect(lastDayOfCalendar.getDay()).toEqual(6);
  }));

  it('should return last day of the calendar when month ends on saturday', inject([DateService], (service: DateService) => {
    const today = new Date('2019-08-15');
    const lastDayOfCalendar = service.getLastDayOfMonthOnCalendar(today);

    // 31 aug => 31 / 07 / 2019
    expect(lastDayOfCalendar.getFullYear()).toEqual(2019);
    expect(lastDayOfCalendar.getMonth()).toEqual(7);
    expect(lastDayOfCalendar.getDate()).toEqual(31);
    expect(lastDayOfCalendar.getDay()).toEqual(6);
  }));

});

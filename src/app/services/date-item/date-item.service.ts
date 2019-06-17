import { Injectable } from '@angular/core';
import { DayItem } from 'src/app/models';
import { DateService } from '../date/date.service';

@Injectable({
  providedIn: 'root'
})
export class DateItemService {

constructor(private dateService: DateService) { }

  getDateItemFromDate(date: Date, hasMonth: boolean, actualDate: Date): DayItem {
    return {
      date,
      hasMonth: hasMonth || date.getDate() === 1,
      isToday: this.dateService.datesAreEqual(date, new Date()),
      day: date.getDate(),
      month: '' + date.getMonth(),
      isInActualMonth: !!(date.getMonth() === actualDate.getMonth() && date.getFullYear() === actualDate.getFullYear()),
      isWeekend: date.getDay() === 0 || date.getDay() === 6
    };
  }

}

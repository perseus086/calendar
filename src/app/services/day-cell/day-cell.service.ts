import { Injectable } from '@angular/core';
import { DayCell } from 'src/app/models';
import { DateService } from '../date/date.service';

@Injectable({
  providedIn: 'root'
})
export class DayCellService {

constructor(private dateService: DateService) { }

  getDayCellFromDate(date: Date, hasMonth: boolean, actualDate: Date): DayCell {
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

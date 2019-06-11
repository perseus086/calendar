import { Injectable } from '@angular/core';
import { Days } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  private daysOfTheWeek = [];

  constructor() {
    this.daysOfTheWeek = this.getDaysOfTheWeekList();
  }

  getDaysOfTheWeekList(): string[] {
    const daysOfTheWeekList = [];
    // tslint:disable-next-line:forin
    for (const eachDay in Days) {
      daysOfTheWeekList.push(eachDay);
    }
    return daysOfTheWeekList;
  }

  // This can not necesarily correspond to the 1st day of the month
  getFirstDayOfMonthOnCalendar(date: Date): Date {
    let firstDay =  new Date(date.getFullYear(), date.getMonth(), 1);

    // Sunday is 0
    if (firstDay.getDay() !== 0) {
      firstDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), - firstDay.getDay() + 1);
    }

    return firstDay;
  }

  // This can not necesarily correspond to the 1st day of the month
  getLastDayOfMonthOnCalendar(date: Date): Date {
    let lastDay =  new Date(date.getFullYear(), date.getMonth() + 1, 0);

    if (lastDay.getDay() !== 6) {
      lastDay = new Date(lastDay.getFullYear(), lastDay.getMonth() + 1, 6 - lastDay.getDay());
    }
    return lastDay;
  }

  getAllDaysOfMonth(firstDay: Date, lastDay: Date): Date[] {
    const daysOfTheMonth = [];

    while (
      !(firstDay.getFullYear() === lastDay.getFullYear()
      && firstDay.getMonth() === lastDay.getMonth()
      && firstDay.getDate() === lastDay.getDate()) ) {
      daysOfTheMonth.push(firstDay);
      firstDay = new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 1);
    }

    daysOfTheMonth.push(lastDay);

    return daysOfTheMonth;
  }

}

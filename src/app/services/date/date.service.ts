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

  getDaysForCalendar(date: Date): Date[][] {

    const calendarDays = [];
    const initialDay = this.getFirstDayOfMonthOnCalendar(date);
    const finalDay = this.getLastDayOfMonthOnCalendar(date);
    const daysOfMonth = this.getAllDaysOfMonth(initialDay, finalDay);

    while (daysOfMonth.length > 0) {
      calendarDays.push(daysOfMonth.splice(0, 7));
    }

    return calendarDays;
  }

  datesAreEqual(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() && date1.getMonth() === date2.getMonth() && date1.getFullYear() === date2.getFullYear();
  }


  mergeDayAndHour(day: Date, hoursAndMinutes: string): Date {
    const hour = parseInt(hoursAndMinutes.split(':')[0], 10);
    const minutes = parseInt(hoursAndMinutes.split(':')[1], 10);
    day.setHours(hour, minutes);
    return day;
  }

  getTimeFromDate(date: Date): string {
    return date.toTimeString().split(' ')[0];
  }

}

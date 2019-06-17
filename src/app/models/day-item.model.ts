export interface DayItem {
  date: Date;
  isToday: boolean;
  hasMonth: boolean;
  day: number;
  month: string;
  isWeekend: boolean;
  isInActualMonth: boolean;
}

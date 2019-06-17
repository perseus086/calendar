import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MAT_DATE_FORMATS
} from '@angular/material';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { DateService } from 'src/app/services';
import { DayItemModule } from '../day-item/day-item.component';

export const MONTH_YEAR_FORMAT = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MONTH_YEAR_FORMAT },
  ]
})
export class CalendarComponent implements OnInit {

  date: FormControl;
  calendarDate: Date;
  actualDate: Date;
  weekdayLabels: string[];

  cellItems: Date[][];
  columns = 7;
  rows: number;
  Arr = Array;

  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) { }

  ngOnInit() {
    this.createForm();
    this.actualDate = new Date();
    this.calendarDate = this.actualDate;
    this.weekdayLabels = this.dateService.getDaysOfTheWeekList();
    this.setCellItemsAndRows();
  }

  createForm() {
    this.date = this.formBuilder.control({
      value: new Date()
    });
  }

  setCellItemsAndRows() {
    this.cellItems = this.dateService.getDaysForCalendar(this.calendarDate);
    this.rows = this.cellItems.length;
  }

  chosenYearHandler(year: Date) {
    this.date.setValue(year);
  }

  chosenMonthHandler(month: Date, datePicker) {
    this.date.setValue(month);
    this.calendarDate = this.date.value;
    this.setCellItemsAndRows();
    datePicker.close();
  }

}


@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    DayItemModule
  ],
  exports: [
    CalendarComponent
  ],
  declarations: [
    CalendarComponent
  ],
  providers: [
    DateService
  ]
})
export class CalendarModule {}
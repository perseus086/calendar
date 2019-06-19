import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { FormsModule, FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

import { DateService } from 'src/app/services';
import { ReminderFormModule } from '../reminder-form/reminder-form.component';
import { CalendarDayCellModule } from '../calendar-day-cell/calendar-day-cell.component';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  date: FormControl;
  selectedDate: Date;
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
    // Initialize with today
    this.selectedDate = new Date();
    this.weekdayLabels = this.dateService.getDaysOfTheWeekList();
    this.setCellItemsAndRows();
  }

  createForm() {
    this.date = this.formBuilder.control({
      value: new Date(),
    });
    this.date.setValue(new Date());
  }

  setCellItemsAndRows() {
    this.cellItems = this.dateService.getDaysForCalendar(this.selectedDate);
    this.rows = this.cellItems.length;
  }

  chosenYearHandler(year: Date) {
    this.date.setValue(year);
  }

  chosenMonthHandler(month: Date, datePicker) {
    this.date.setValue(month);
    this.selectedDate = this.date.value;
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
    CalendarDayCellModule,
    ReminderFormModule
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

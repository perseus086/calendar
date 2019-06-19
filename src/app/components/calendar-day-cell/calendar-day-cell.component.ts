import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule, MatIconModule } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DayCell, Reminder } from 'src/app/models';
import { DayCellService, ReminderListService } from 'src/app/services';
import { EditReminderDialogComponent, EditReminderDialogModule } from '../edit-reminder-dialog/edit-reminder-dialog.component';
import { ReminderListModule } from '../reminder-list/reminder-list.component';
import {
  DeleteAllRemidersDialogComponent,
  DeleteAllRemidersDialogModule
} from '../delete-all-remiders-dialog/delete-all-remiders-dialog.component';


@Component({
  selector: 'app-calendar-day-cell',
  templateUrl: './calendar-day-cell.component.html',
  styleUrls: ['./calendar-day-cell.component.scss']
})
export class CalendarDayCellComponent implements OnInit {

  @Input() date: Date;
  @Input() today: Date;
  @Input() actualDate: Date;
  @Input() hasMonth: boolean;

  reminderList$: Observable<Reminder[]>;
  reminders: Reminder[] = [];
  dayCell: DayCell;

  constructor(
    private dayCellService: DayCellService,
    private matDialog: MatDialog,
    private reminderListService: ReminderListService
  ) { }

  ngOnInit() {
    this.dayCell = this.dayCellService.getDayCellFromDate(this.date, this.hasMonth, this.actualDate);

    this.reminderList$ = this.reminderListService.getReminderList();
    this.subscribeToReminderList();
  }

  subscribeToReminderList() {
    this.reminderList$
    .pipe(
      map(reminders => reminders.filter(
        reminder => {
          return  reminder.date.getFullYear() === this.dayCell.date.getFullYear() &&
                  reminder.date.getMonth() === this.dayCell.date.getMonth() &&
                  reminder.date.getDate() === this.dayCell.date.getDate();
        }
      )),
      map(reminders => {
        return reminders.sort((reminder1, reminder2) => (reminder1.date as any) - (reminder2.date as any) );
      })
    )
    .subscribe(thisDayReminders => {
      this.reminders = thisDayReminders;
    });
  }

  openNotificationDialog() {
    this.matDialog.open(EditReminderDialogComponent, {
      minWidth: '360px',
      panelClass: 'calendar-dialog',
      data: {
        reminder: {
          text: null,
          date: this.dayCell.date,
          color: null,
          city: null
        },
        isToday: this.dayCell.isToday
      }
    });
  }

  openDeleteAllDialog() {
    this.matDialog.open(DeleteAllRemidersDialogComponent, {
      minWidth: '360px',
      panelClass: 'calendar-dialog',
      data: {
        remindersIds: this.reminders.map(reminder => reminder.id),
        day: this.dayCell.date
      }
    });
  }

}

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    EditReminderDialogModule,
    ReminderListModule,
    MatIconModule,
    DeleteAllRemidersDialogModule
  ],
  exports: [
    CalendarDayCellComponent
  ],
  declarations: [
    CalendarDayCellComponent
  ],
  entryComponents: [
    EditReminderDialogComponent,
    DeleteAllRemidersDialogComponent
  ]
})
export class CalendarDayCellModule {}

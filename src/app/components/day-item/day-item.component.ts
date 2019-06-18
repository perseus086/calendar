import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayItem, Reminder } from 'src/app/models';
import { DateItemService, ReminderListService } from 'src/app/services';
import { MatDialog, MatDialogModule } from '@angular/material';
import { EditReminderDialogComponent, EditReminderDialogModule } from '../edit-reminder-dialog/edit-reminder-dialog.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReminderListModule } from '../reminder-list/reminder-list.component';

@Component({
  selector: 'app-day-item',
  templateUrl: './day-item.component.html',
  styleUrls: ['./day-item.component.scss']
})
export class DayItemComponent implements OnInit {

  @Input() date: Date;
  @Input() today: Date;
  @Input() actualDate: Date;
  @Input() hasMonth: boolean;

  reminderList$: Observable<Reminder[]>;
  reminders: Reminder[] = [];
  dayItem: DayItem;

  constructor(
    private dayItemService: DateItemService,
    private matDialog: MatDialog,
    private reminderListService: ReminderListService
  ) { }

  ngOnInit() {
    this.dayItem = this.dayItemService.getDateItemFromDate(this.date, this.hasMonth, this.actualDate);
    this.reminderList$ = this.reminderListService.getReminderList();
    this.subscribeToReminderList();
  }

  subscribeToReminderList() {
    this.reminderList$
    .pipe(
      map(reminders => reminders.filter(
        reminder => {
          return  reminder.date.getFullYear() === this.dayItem.date.getFullYear() &&
                  reminder.date.getMonth() === this.dayItem.date.getMonth() &&
                  reminder.date.getDate() === this.dayItem.date.getDate();
        }
      ))
    )
    .subscribe(reminders => {
      this.reminders = reminders;
    });
  }

  openNotificationDialog() {
    this.matDialog.open(EditReminderDialogComponent, {
      minWidth: '360px',
      panelClass: 'calendar-dialog',
      data: {
        text: null,
        date: this.dayItem.date,
        color: null,
        city: null
      }
    });
  }

}

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    EditReminderDialogModule,
    ReminderListModule
  ],
  exports: [
    DayItemComponent
  ],
  declarations: [
    DayItemComponent
  ],
  entryComponents: [
    EditReminderDialogComponent
  ]
})
export class DayItemModule {}

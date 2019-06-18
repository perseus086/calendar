import { Component, OnInit, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material';

import { Reminder } from 'src/app/models';
import { EditReminderDialogComponent } from '../edit-reminder-dialog/edit-reminder-dialog.component';

@Component({
  selector: 'app-reminder-list',
  templateUrl: './reminder-list.component.html',
  styleUrls: ['./reminder-list.component.scss']
})
export class ReminderListComponent {

  @Input() reminders: Reminder[];

  constructor(private matDialog: MatDialog) { }

  openEditDialog(reminder) {
    this.matDialog.open(EditReminderDialogComponent, {
      minWidth: '360px',
      panelClass: 'calendar-dialog',
      data: {
        reminder
      }
    });
  }
}


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule
  ],
  exports: [
    ReminderListComponent
  ],
  declarations: [
    ReminderListComponent
  ]
})
export class ReminderListModule {}

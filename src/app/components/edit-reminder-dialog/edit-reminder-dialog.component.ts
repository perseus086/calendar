import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReminderFormModule } from '../reminder-form/reminder-form.component';
import { Reminder } from 'src/app/models';
import { ReminderListService } from 'src/app/services';

@Component({
  selector: 'app-edit-reminder-dialog',
  templateUrl: './edit-reminder-dialog.component.html',
  styleUrls: ['./edit-reminder-dialog.component.scss']
})
export class EditReminderDialogComponent implements OnInit {

  reminder: Reminder;
  isToday: boolean;

  constructor(
    public dialogRef: MatDialogRef<EditReminderDialogComponent>,
    private reminderListService: ReminderListService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.reminder = this.data.reminder;
    this.isToday = this.data.isToday;
  }

  onFormDiscard() {
    this.dialogRef.close();
  }

  onFormSuccess(reminder: Reminder) {
    if (this.reminderListService.remiderAlreadyExists(reminder.id)) {
      this.reminderListService.editReminder(reminder);
    } else {
      this.reminderListService.addReminder(reminder);
    }
    this.dialogRef.close();
  }

  onDeleteReminder(reminderId: string) {
    this.reminderListService.deleteReminder(reminderId);
    this.dialogRef.close();
  }

}

@NgModule({
  imports: [
    CommonModule,
    ReminderFormModule
  ],
  declarations: [
    EditReminderDialogComponent
  ],
  exports: [
    EditReminderDialogComponent
  ]
})
export class EditReminderDialogModule {}

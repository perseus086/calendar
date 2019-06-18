import { Component, OnInit, NgModule, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatButtonModule } from '@angular/material';
import { ReminderListService } from 'src/app/services';

@Component({
  selector: 'app-delete-all-remiders-dialog',
  templateUrl: './delete-all-remiders-dialog.component.html',
  styleUrls: ['./delete-all-remiders-dialog.component.scss']
})
export class DeleteAllRemidersDialogComponent implements OnInit {

  date: Date;
  remindersToDeleteIds: string[];

  constructor(
    public dialogRef: MatDialogRef<DeleteAllRemidersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private reminderListService: ReminderListService
  ) { }

  ngOnInit() {
    this.date = this.data.day;
    this.remindersToDeleteIds = this.data.remindersIds;
  }

  cancel() {
    this.dialogRef.close();
  }

  deleteAll() {
    this.reminderListService.deleteMultipleReminders(this.remindersToDeleteIds);
    this.dialogRef.close();
  }

}


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    DeleteAllRemidersDialogComponent
  ],
  declarations: [
    DeleteAllRemidersDialogComponent
  ],
  providers: [
    DatePipe
  ]
})
export class DeleteAllRemidersDialogModule {}

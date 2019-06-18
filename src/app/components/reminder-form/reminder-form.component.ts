import { Component, OnInit, NgModule, Output, EventEmitter, Input } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatOptionModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { Color, Reminder } from 'src/app/models';
import { ColorService, DateService, UtilitiesService } from 'src/app/services';

const { compose, required, maxLength } = Validators;

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit {

  @Input() reminder: Reminder;
  @Output() formSuccess = new EventEmitter<Reminder>();
  @Output() formDiscard = new EventEmitter();
  @Output() deleteReminder = new EventEmitter<string>();

  reminderForm: FormGroup;
  colors: Color[];

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private dateService: DateService,
    private utilitiesService: UtilitiesService
  ) { }

  ngOnInit() {
    this.colors = this.colorService.getColorList();
    this.initForm();
  }

  initForm() {
    this.reminderForm = this.formBuilder.group({
      text: [this.reminder.text, compose([required, maxLength(30)]) ],
      day: [this.reminder.date, required],
      time: [this.dateService.getTimeFromDate(this.reminder.date), required],
      city: [this.reminder.city, required],
      color: [this.reminder.color, required]
    });
  }

  save() {
    const date = this.dateService.mergeDayAndHour(this.formDay.value, this.formTime.value);
    const reminder = {
      id: this.reminder.id || this.utilitiesService.uuidv4(),
      text: this.formText.value,
      date,
      city: this.formCity.value,
      color: this.formColor.value
    };

    this.formSuccess.emit(reminder);
  }

  discard() {
    this.formDiscard.emit(null);
  }

  delete() {
    this.deleteReminder.emit(this.reminder.id);
  }


  get formText() { return this.reminderForm.get('text'); }
  get formDay() { return this.reminderForm.get('day'); }
  get formTime() { return this.reminderForm.get('time'); }
  get formCity() { return this.reminderForm.get('city'); }
  get formColor() { return this.reminderForm.get('color'); }
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
    MatButtonModule
  ],
  exports: [
    ReminderFormComponent
  ],
  declarations: [
    ReminderFormComponent
  ]
})
export class ReminderFormModule {}

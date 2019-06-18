import { Component, OnInit, NgModule, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
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
import { Color, Reminder, Weather } from 'src/app/models';
import { ColorService, DateService, UtilitiesService } from 'src/app/services';
import { debounceTime, takeUntil, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ForecastService } from 'src/app/services/forecast/forecast.service';
import { HttpClient } from '@angular/common/http';
import { WeatherModule } from '../weather/weather.component';

const { compose, required, maxLength } = Validators;

@Component({
  selector: 'app-reminder-form',
  templateUrl: './reminder-form.component.html',
  styleUrls: ['./reminder-form.component.scss']
})
export class ReminderFormComponent implements OnInit, OnDestroy {


  @Input() reminder: Reminder;
  @Input() isToday: boolean;
  @Output() formSuccess = new EventEmitter<Reminder>();
  @Output() formDiscard = new EventEmitter();
  @Output() deleteReminder = new EventEmitter<string>();

  reminderForm: FormGroup;
  colors: Color[];
  weather: Weather;

  onDestroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private dateService: DateService,
    private utilitiesService: UtilitiesService,
    private forecastService: ForecastService
  ) { }

  ngOnInit() {
    this.colors = this.colorService.getColorList();
    this.initForm();
    this.subscribeToCity();
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

  subscribeToCity() {
    if (this.isToday) {
      this.formCity.valueChanges
        .pipe(
          takeUntil(this.onDestroy$),
          debounceTime(500)
        )
        .subscribe(
          city => {
            if (city) {
              this.forecastService.getTodayWeatherByCity(city)
                .pipe(
                  map(weatherResponse => weatherResponse.weather[0])
                )
                .subscribe(
                  (resp) => { this.weather = resp; },
                  (error) => { this.weather = null; }
                );
            }
          }
        );
    }
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

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
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
    MatButtonModule,
    WeatherModule
  ],
  exports: [
    ReminderFormComponent
  ],
  declarations: [
    ReminderFormComponent
  ]
})
export class ReminderFormModule {}

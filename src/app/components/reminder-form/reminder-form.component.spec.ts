/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { ReminderFormComponent, ReminderFormModule } from './reminder-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ColorService } from 'src/app/services';


describe('ReminderFormComponent', () => {
  let component: ReminderFormComponent;
  let fixture: ComponentFixture<ReminderFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReminderFormModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    component.reminder = {
      text: null,
      id: null,
      city: null,
      date: new Date(),
      color: null
    };
    component.ngOnInit();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should initialize form on init', () => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    component.reminder = {
      text: null,
      id: null,
      city: null,
      date: new Date(),
      color: null
    };
    spyOn(component, 'initForm').and.callThrough();
    component.ngOnInit();
    expect(component.initForm).toHaveBeenCalled();
  });

  it('should set form as invalid if characters are more than 30 for reminder text', () => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    component.reminder = {
      text: 'sometext',
      id: '12345',
      city: 'uio',
      date: new Date(),
      color: 'black'
    };
    component.ngOnInit();
    component.formText.setValue('0123456789012345678901234567890');
    expect(component.reminderForm.valid).toBeFalsy();
  });

  it('should set form as valid if characters are less than 30 for reminder text', () => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    component.reminder = {
      text: 'sometext',
      id: '12345',
      city: 'uio',
      date: new Date(),
      color: 'black'
    };
    component.initForm();
    component.formText.setValue('0123456789012345678901234567890');
    component.formText.updateValueAndValidity();
    expect(component.formText.value).toBe('0123456789012345678901234567890');
    expect(component.reminderForm.valid).toBeFalsy();
  });

  it('should set form as valid if characters are less than 30 for reminder text', () => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    component.reminder = {
      text: 'sometext',
      id: '12345',
      city: 'uio',
      date: new Date(),
      color: 'black'
    };
    component.initForm();
    component.formText.setValue('012345678901234567890123456789');
    component.formText.updateValueAndValidity();
    expect(component.formText.value).toBe('012345678901234567890123456789');
    expect(component.reminderForm.valid).toBeTruthy();
  });

  it('should set form as invalid if city is missing', () => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    component.reminder = {
      text: 'sometext',
      id: '12345',
      city: 'uio',
      date: new Date(),
      color: 'black'
    };
    component.initForm();
    component.formCity.setValue('');
    component.formCity.updateValueAndValidity();
    expect(component.formCity.value).toBe('');
    expect(component.reminderForm.valid).toBeFalsy();
  });

  it('should set form as invalid if color is missing', () => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    component.reminder = {
      text: 'sometext',
      id: '12345',
      city: 'uio',
      date: new Date(),
      color: 'black'
    };
    component.initForm();
    component.formColor.setValue(null);
    component.formColor.updateValueAndValidity();
    expect(component.formColor.value).toBe(null);
    expect(component.reminderForm.valid).toBeFalsy();
  });

  it('should set hour correctly based on date', () => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    const date = new Date();
    date.setHours(20, 30, 10);
    component.reminder = {
      text: 'sometext',
      id: '12345',
      city: 'uio',
      date,
      color: 'black'
    };
    component.initForm();
    expect(component.formTime.value).toBe('20:30:10');
  });

  it('should get colors list', inject([ColorService], (colorService) => {
    fixture = TestBed.createComponent(ReminderFormComponent);
    component = fixture.componentInstance;
    component.reminder = {
      text: 'sometext',
      id: '12345',
      city: 'uio',
      date: new Date(),
      color: 'black'
    };
    spyOn(colorService, 'getColorList').and.callThrough();
    component.ngOnInit();

    expect(component.colors.length).toBeGreaterThan(0);
  }));

});

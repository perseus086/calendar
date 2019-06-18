/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderFormComponent, ReminderFormModule } from './reminder-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';


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


  it('should set the form invalid if text is longer than 30 chars', () => {
    
  })



});

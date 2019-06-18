/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DayItemComponent, DayItemModule } from './day-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DayItemComponent', () => {
  let component: DayItemComponent;
  let fixture: ComponentFixture<DayItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DayItemModule,
        BrowserAnimationsModule
       ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(DayItemComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

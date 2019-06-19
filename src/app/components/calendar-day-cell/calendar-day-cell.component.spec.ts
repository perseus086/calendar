/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarDayCellComponent, CalendarDayCellModule } from './calendar-day-cell.component';

describe('CalendarDayCellComponent', () => {
  let component: CalendarDayCellComponent;
  let fixture: ComponentFixture<CalendarDayCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CalendarDayCellModule,
        BrowserAnimationsModule
       ]
    })
    .compileComponents();
  }));

  it('should create', () => {
    fixture = TestBed.createComponent(CalendarDayCellComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

import { Component, OnInit } from '@angular/core';
import { DateService } from './services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'calendar';

  constructor(private dateService: DateService) {}

  ngOnInit() {
    const today = new Date();
    const firstDay = this.dateService.getFirstDayOfMonthOnCalendar(today);
    const lastDay = this.dateService.getLastDayOfMonthOnCalendar(today);

    const month = this.dateService.getAllDaysOfMonth(firstDay, lastDay);


  }

}

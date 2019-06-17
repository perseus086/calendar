import { Component, OnInit, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayItem } from 'src/app/models';
import { DateItemService } from 'src/app/services';

@Component({
  selector: 'app-day-item',
  templateUrl: './day-item.component.html',
  styleUrls: ['./day-item.component.scss']
})
export class DayItemComponent implements OnInit {

  @Input() date: Date;
  @Input() today: Date;
  @Input() actualDate: Date;
  @Input() hasMonth: boolean;

  dayItem: DayItem;

  constructor(private dayItemService: DateItemService) { }

  ngOnInit() {
    this.dayItem = this.dayItemService.getDateItemFromDate(this.date, this.hasMonth, this.actualDate);
  }

}

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    DayItemComponent
  ],
  declarations: [
    DayItemComponent
  ]
})
export class DayItemModule {}

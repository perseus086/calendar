import { Component, NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

import { Weather } from 'src/app/models';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  @Input() weather: Weather;
  baseImgUrl = environment.weatherImageUrl;
}

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    WeatherComponent
  ],
  declarations: [
    WeatherComponent
  ]
})
export class WeatherModule {}

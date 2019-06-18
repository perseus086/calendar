import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherResponse } from 'src/app/models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  constructor(private http: HttpClient) {}

  getTodayWeatherByCity(city: string) {
    return this.http.get<WeatherResponse>(
      `${environment.api}/weather?q=${city}&APPID=${environment.appId}`
    );
  }

}

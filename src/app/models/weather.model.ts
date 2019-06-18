export interface WeatherResponse {
  coord: any;
  weather: Weather[];
  base: string;
  main: any;
  wind: any;
  rain: any;
  clouds: any;
  dt: number;
  sys: any;
  id: number;
  name: string;
  cod: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

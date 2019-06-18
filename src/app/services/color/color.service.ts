import { Injectable } from '@angular/core';
import { Color } from 'src/app/models';

const colors = [
  {
    label: 'Orange',
    value: 'orange'
  },
  {
    label: 'Lawngreen',
    value: 'lawngreen'
  },
  {
    label: 'Turquoise',
    value: 'turquoise'
  },
  {
    label: 'Blue',
    value: 'blue'
  },
  {
    label: 'Satan grey',
    value: '#666666'
  },
];

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor() { }

  getColorList(): Color[] {
    return colors;
  }

}

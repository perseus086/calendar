import { Injectable } from '@angular/core';
import { Color } from 'src/app/models';

const colors = [
  {
    label: 'Medium Violet Red	',
    value: 'mediumvioletred	'
  },
  {
    label: 'Orange Red',
    value: 'orangered'
  },
  {
    label: 'Peach Puff',
    value: 'peachpuff'
  },
  {
    label: 'Magenta	',
    value: 'magenta	'
  },
  {
    label: 'Medium Purple	',
    value: 'mediumpurple	'
  },
  {
    label: 'Chartreuse	',
    value: 'chartreuse	'
  },
  {
    label: 'Pale Green	',
    value: 'palegreen	'
  },
  {
    label: 'Spring Green',
    value: 'springgreen'
  },
  {
    label: 'Turquoise',
    value: 'turquoise'
  },
  {
    label: 'Deep Sky Blue',
    value: 'deepskyblue'
  },
  {
    label: 'Cornflower Blue',
    value: 'cornflowerblue'
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

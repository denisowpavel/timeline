import { Pipe, PipeTransform } from '@angular/core';
import { ISceneRuler } from '../../../types/tl-scene';

@Pipe({
  name: 'rulerUnitLabel',
  standalone: true,
})
export class RulerUnitLabelPipe implements PipeTransform {
  transform(unitTime: Date, ...args: [ISceneRuler]): unknown {
    let [ruler] = args;
    if (!unitTime || !ruler) {
      return '-';
    }
    switch (ruler.units) {
      case 'minutes':
        const min = unitTime.getMinutes();
        if(ruler.pxInUnit < 100){
          return `${min < 10 ? '0' : ''}${min}`;
        }
        const h = unitTime.getHours();
        return `${h < 10 ? '0' : ''}${h}:${min < 10 ? '0' : ''}${min}`;

      case 'hours':
        return `${unitTime.getHours()}:00`;

      case 'days':
        const mm = unitTime.getMonth() + 1;
        const dd = unitTime.getDate();
        return `${dd < 10 ? '0' : ''}${dd}.${mm < 10 ? '0' : ''}${mm}`;

      case 'weeks':
        return unitTime.toDateString();

      case 'years':
        return unitTime.getFullYear();

      default:
        return '~';
    }
  }
}

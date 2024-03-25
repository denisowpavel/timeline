import { Pipe, PipeTransform } from '@angular/core';
import { ISceneRuler } from '../../../types';

@Pipe({
  name: 'rulerUnitTime',
  standalone: true,
})
export class RulerUnitTimePipe implements PipeTransform {
  transform(startTime: Date, ...args: [number, ISceneRuler]): Date {
    let [unitIndex, ruler] = args;
    if (!startTime || unitIndex < 0 || !ruler) {
      return new Date();
    }
    let unitTime = new Date(startTime);
    switch (ruler.units) {
      case 'minutes':
        unitTime.setMinutes(startTime.getMinutes() + unitIndex);
        break;
      case 'hours':
        unitTime.setHours(startTime.getHours() + unitIndex);
        break;
      case 'days':
        unitTime.setDate(startTime.getDate() + unitIndex);
        break;
      case 'weeks':
        unitTime.setDate(startTime.getDate() + unitIndex * 7);
        const prevMonday = new Date(startTime);
        prevMonday.setMinutes(0);
        prevMonday.setHours(0);
        prevMonday.setDate(
          prevMonday.getDate() + ((1 - 7 - prevMonday.getDay()) % 7),
        );
        unitTime = new Date(
          prevMonday.getTime() + 60 * 60 * 24 * 7 * unitIndex * 1000,
        );
        break;
      case 'years':
        unitTime.setFullYear(startTime.getFullYear() + unitIndex);
        break;
      default:
        return new Date();
    }
    return unitTime;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { ISceneRuler } from '../../../types/tl-scene';

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
    if (ruler.units !== 'minutes') {
      return new Date();
    }
    const unitTime = new Date(startTime);
    unitTime.setMinutes(startTime.getMinutes() + unitIndex);
    return unitTime;
  }
}

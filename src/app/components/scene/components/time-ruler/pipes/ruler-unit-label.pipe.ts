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
    if (ruler.units !== 'minutes') {
      return '~';
    }
    return unitTime.getMinutes() + 1;
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import {
  IRulerUnitLabel,
  ISceneRuler,
  unitsType,
} from '../../../types/tl-scene';
import { DAY_NAMES } from '../../../types/const';

@Pipe({
  name: 'rulerUnitLabel',
  standalone: true,
})
export class RulerUnitLabelPipe implements PipeTransform {
  transform(unitTime: Date, ...args: [ISceneRuler, Date]): IRulerUnitLabel {
    let [ruler, currentTime] = args;
    const isCurrent = this.isSameTime(unitTime, currentTime, ruler.units);
    if (!unitTime || !ruler) {
      return { label: '-' };
    }
    switch (ruler.units) {
      case 'minutes':
        const min = unitTime.getMinutes();
        const round = min === 0 || min === 30;
        if (ruler.pxInUnit < 110) {
          return {
            label: `${min < 10 ? '0' : ''}${min}`,
            current: isCurrent,
            round: round,
          };
        }
        const h = unitTime.getHours();
        return {
          label: `${h < 10 ? '0' : ''}${h}:${min < 10 ? '0' : ''}${min}`,
          current: isCurrent,
          round: round,
        };

      case 'hours':
        const hours = unitTime.getHours();
        return {
          label: `${hours}:00`,
          current: isCurrent,
          round: hours === 0 || hours === 12,
          meta: `${unitTime.getDate()} ${DAY_NAMES[unitTime.getDay()]}`,
        };

      case 'days':
        const mm = unitTime.getMonth() + 1;
        const dd = unitTime.getDate();
        const dayOfWeek = unitTime.getDay();
        return {
          label: `${dd < 10 ? '0' : ''}${dd}.${mm < 10 ? '0' : ''}${mm}`,
          current: isCurrent,
          meta: DAY_NAMES[dayOfWeek],
          round: dayOfWeek === 0,
        };

      case 'weeks':
        return {
          label: unitTime.toDateString(),
          current: isCurrent,
        };

      case 'years':
        return {
          label: unitTime.getFullYear().toString(),
          current: isCurrent,
        };

      default:
        return { label: '~' };
    }
  }

  public isSameTime(time1: Date, time2: Date, unitType: unitsType): boolean {
    const sameYear = time1.getFullYear() === time2.getFullYear();
    const sameMonth = time1.getMonth() === time2.getMonth();
    const sameWeekNumber = false; //TODO;
    const sameDate = time1.getDate() === time2.getDate();
    const sameHours = time1.getHours() === time2.getHours();
    const sameMinutes = time1.getMinutes() === time2.getMinutes();

    switch (unitType) {
      case 'minutes':
        return sameYear && sameMonth && sameDate && sameHours && sameMinutes;

      case 'hours':
        return sameYear && sameMonth && sameDate && sameHours;

      case 'days':
        return sameYear && sameMonth && sameDate;

      case 'weeks':
        return sameYear && sameWeekNumber;

      case 'years':
        return sameYear;

      default:
        return false;
    }
  }
}

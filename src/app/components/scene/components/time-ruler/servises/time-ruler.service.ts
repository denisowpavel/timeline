import { computed, Injectable, Signal } from '@angular/core';
import { SceneViewService } from '../../../services/scene-view.service';

@Injectable({
  providedIn: 'root',
})
export class TimeRulerService {
  constructor(public sceneViewService: SceneViewService) {}

  public firstUnitWidth: Signal<number> = computed((): number => {
    const ruler = this.sceneViewService.sceneRuler();
    let secondLeft;
    switch (ruler?.units) {
      case 'minutes':
        secondLeft = 60 - this.sceneViewService.view().startTime.getSeconds();
        return (ruler?.pxInUnit / 60) * secondLeft || 0;
      case 'hours':
        secondLeft =
          60 -
          this.sceneViewService.view().startTime.getSeconds() +
          (60 - this.sceneViewService.view().startTime.getMinutes()) * 60;
        return (ruler?.pxInUnit / (60 * 60)) * secondLeft || 0;
      case 'days':
        const minLeft =
          60 -
          this.sceneViewService.view().startTime.getMinutes() +
          (23 - this.sceneViewService.view().startTime.getHours()) * 60;
        return (ruler?.pxInUnit / (24 * 60)) * minLeft || 0;
      case 'weeks':
        let dayOfWeek = this.sceneViewService.view().startTime.getDay();
        if (dayOfWeek === 0) {
          dayOfWeek = 7;
        }
        const hoursLeft =
          24 -
          this.sceneViewService.view().startTime.getHours() +
          (7 - dayOfWeek) * 24;
        return (ruler?.pxInUnit / (7 * 24)) * hoursLeft || 0;
      case 'years':
        const start = this.sceneViewService.view().startTime;
        const dayOfYear =
          (Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()) -
            Date.UTC(start.getFullYear(), 0, 0)) /
          24 /
          60 /
          60 /
          1000;
        return (ruler?.pxInUnit / 365) * (365 - dayOfYear) || 0;
      default:
        return ruler?.pxInUnit || 0;
    }
  });

  public currentTimeLeft: Signal<number> = computed((): number => {
    const view = this.sceneViewService.view();
    const secondShift =
      (view.currentTime.getTime() - view.startTime.getTime()) / 1000;
    if (secondShift < 0) {
      return 0;
    }
    const left =
      (this.sceneViewService.sceneRuler()?.pxInUnit * secondShift) /
      this.sceneViewService.secondInUnit();
    if (left > this.sceneViewService.width()) {
      return 0;
    }
    return left;
  });
}

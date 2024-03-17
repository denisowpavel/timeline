import { computed, Injectable, Signal, signal } from '@angular/core';
import { ISceneRuler, ISceneView } from '../types/tl-scene';
import { INITIAL_SCENE_VIEW } from '../types/const';

@Injectable({
  providedIn: 'root',
})
export class SceneViewService {
  public width = signal<number>(0);
  public view = signal<ISceneView>(INITIAL_SCENE_VIEW);

  // Exponential scale
  public pxInMinute: Signal<number> = computed(() => {
    return Math.exp(this.view().lineScale);
  });

  public unitInLine: Signal<ISceneRuler> = computed(() => {
    const pxInMinute = this.pxInMinute();
    const minutes = Math.trunc(this.width() / this.pxInMinute());
    const hours = Math.trunc(minutes / 60);
    const days = Math.trunc(hours / 24);
    const weeks = Math.trunc(days / 7);
    const years = Math.trunc(days / 365);
    if (years >= 1) {
      return {
        unitOnScreen: years,
        units: 'years',
        pxInUnit: pxInMinute * 60 * 24 * 7 * 365,
      } as ISceneRuler;
    } else if (weeks >= 1) {
      return {
        unitOnScreen: weeks,
        units: 'weeks',
        pxInUnit: pxInMinute * 60 * 24 * 7,
      } as ISceneRuler;
    } else if (days >= 1) {
      return {
        unitOnScreen: days,
        units: 'days',
        pxInUnit: pxInMinute * 60 * 24,
      } as ISceneRuler;
    } else if (hours >= 1) {
      return {
        unitOnScreen: hours,
        units: 'hours',
        pxInUnit: pxInMinute * 60,
      } as ISceneRuler;
    } else {
      return {
        unitOnScreen: minutes,
        units: 'minutes',
        pxInUnit: pxInMinute,
      } as ISceneRuler;
    }
  });

  constructor() {}
}

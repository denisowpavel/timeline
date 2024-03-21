import { computed, Injectable, Signal, signal } from '@angular/core';
import { ISceneRuler, ISceneView } from '../types/tl-scene';
import {
  INITIAL_SCENE_VIEW,
  SCROLL_SENSITIVITY,
  TIME_SENSITIVITY,
} from '../types/const';

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

  public sceneRuler: Signal<ISceneRuler> = computed(() => {
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
        pxInUnit: pxInMinute * 60 * 24 * 365,
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
        unitOnScreen: Math.max(1, minutes),
        units: 'minutes',
        pxInUnit: pxInMinute,
      } as ISceneRuler;
    }
  });

  constructor() {}

  public updateViewScale(delta: number): void {
    if (delta === 0) {
      return;
    }
    this.view.update((view) => {
      let newScale: number;
      newScale = view.lineScale + delta * SCROLL_SENSITIVITY;
      return {
        ...view,
        lineScale: newScale,
      };
    });
  }

  public updateStartTime(delta: number): void {
    if (delta === 0) {
      return;
    }

    this.view.update((view) => {
      const timestamp = Math.floor(view.startTime.getTime() / 1000);

      let timeScale = 0;
      switch (this.sceneRuler().units) {
        case 'minutes':
          timeScale = 1;
          break;
        case 'hours':
          timeScale = 20;
          break;
        case 'days':
          timeScale = 20 * 24;
          break;
        case 'weeks':
          timeScale = 20 * 24 * 7;
          break;
        case 'years':
          timeScale = 10 * 24 * 365;
          break;
        default:
          return view;
      }
      return {
        ...view,
        startTime: new Date(
          (timestamp + delta * TIME_SENSITIVITY * timeScale) * 1000,
        ),
      };
    });
  }
}

import { computed, Injectable, signal } from '@angular/core';
import { TlSceneView } from '../types/tl-scene';
import { INITIAL_SCENE_VIEW } from '../types/const';

@Injectable({
  providedIn: 'root',
})
export class SceneViewService {
  public width = signal<number>(0);
  public view = signal<TlSceneView>(INITIAL_SCENE_VIEW);

  public minutesInLine = computed(() => {
    const min = Math.trunc(this.width() / this.view().scale);
    if (min >= 0) {
      return min;
    } else {
      return 0;
    }
  });


  constructor() {}
}

import { Injectable, signal } from '@angular/core';
import { TlSceneView } from '../types/tl-scene';
import { INITIAL_SCENE_VIEW } from '../types/const';

@Injectable({
  providedIn: 'root',
})
export class SceneViewService {
  public width = signal<number>(0);
  public view = signal<TlSceneView>(INITIAL_SCENE_VIEW);
  constructor() {}
}

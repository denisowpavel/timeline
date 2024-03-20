import { ISceneView } from './tl-scene';

export const INITIAL_SCENE_VIEW: ISceneView = {
  //lineScale: -0.3, // 1 d
  lineScale: 5.8,    // 3 min
  startTime: new Date(),
  currentTime: new Date(),
};

export const SCROLL_SENSITIVITY = -0.001;
export const TIME_SENSITIVITY = 1;

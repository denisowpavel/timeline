import { ISceneView } from './tl-scene';

export const INITIAL_SCENE_VIEW: ISceneView = {
  // lineScale: -7.2, // 3 y
  //lineScale: -3.3, // 3 w
  //lineScale: -1.3, // 3 d
  lineScale: 5.8,    // 3 min
  //lineScale: 2.6,    // 1 h
  startTime: new Date(),//
  currentTime: new Date(),
};

export const SCROLL_SENSITIVITY = -0.001;
export const TIME_SENSITIVITY = 1;

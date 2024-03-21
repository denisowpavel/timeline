import { ISceneView } from './tl-scene';

export const INITIAL_SCENE_VIEW: ISceneView = {
  //lineScale: 5.8,    // 3 min
  //lineScale: 3.4, // 1 h
  //lineScale: 2.6,    // 1 h
  //lineScale: -1.3, // 3 d
  //lineScale: -3.3, // 3 w
  lineScale: -7.2, // 3 y

  startTime: new Date(), //
  currentTime: new Date(),
};

export const SCROLL_SENSITIVITY = -0.001;
export const TIME_SENSITIVITY = 1;

import { ISceneView } from './tl-ruler';

export const INITIAL_SCENE_VIEW: ISceneView = {
  //lineScale: 5.8,    // 3 min
  //lineScale: 3.4,    // 1 h
  //lineScale: 2.6,    // 1 h
  //lineScale: -1.3,   // 3 d
  // lineScale: -2, // 1 w
  //lineScale: -3.3,   // 3 w
  //lineScale: -7.2,   // 3 y
  lineScale: 0.4,
  startTime: new Date('2024-03-25T16:00:00.000Z'), //
  currentTime: new Date(),
  //currentTime: new Date('2024-03-21T15:00:00.000Z'),
};

export const SCROLL_SENSITIVITY = -0.001;
export const TIME_SENSITIVITY = 1;
export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export interface ISceneRuler {
  unitOnScreen: number;
  pxInUnit: number;
  units: 'minutes' | 'hours' | 'days' | 'weeks' | 'years';
}
export interface ISceneView {
  lineScale: number; // Reference scale
  startTime: Date;
  currentTime: Date;
  cursorTime?: Date;
}

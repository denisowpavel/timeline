import {unitsType} from "./tl-scene";

export interface ISceneRuler {
  unitOnScreen: number;
  pxInUnit: number;
  units: unitsType;
}

export interface ISceneView {
  lineScale: number; // Reference scale
  startTime: Date;
  currentTime: Date;
  cursorTime?: Date;
}

export interface IRulerUnitLabel {
  label: string;
  meta?: string;
  current?: boolean;
  round?: boolean;
}

export interface IRulerUnitLabel {
  label: string;
  meta?: string;
  current?: boolean;
  round?: boolean;
}

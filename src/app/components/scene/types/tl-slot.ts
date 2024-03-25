export interface ITimeSlot {
  id: number;
  start: Date;
  end: Date;
  label: string;
  meta?: ITimeSlotMeta;
}

export interface ITimeSlotList  {
  id: number;
  slots: ITimeSlot[];
  label?: string;
}
export interface ITimeSlotMeta {
  color?: string;
}

export interface ITimeSlot {
  id: number;
  start: Date;
  end: Date;
  label: string;
  meta?: string;
}

export interface ITimeSlotList  {
  id: number;
  slots: ITimeSlot[];
  label?: string;
  meta?: string;
}

import { Injectable } from '@angular/core';
import { ITimeSlot, ITimeSlotList, unitsType } from '../types';
import { randomColors, randomValues } from './random-values';

@Injectable({
  providedIn: 'root',
})
export class SceneHelpersService {
  constructor() {}

  get generatedColors(): string | undefined {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  }

  get generatedName(): string {
    return randomValues[Math.floor(Math.random() * randomValues.length)];
  }

  generatedTimeShift(type: unitsType): number {
    const scale = Math.floor(Math.random() * 5) + 1;
    let time = 60 * 1000;
    switch (type) {
      case 'hours':
        time *= 60;
        break;

      case 'days':
        time *= 60 * 24;
        break;

      case 'weeks':
        time *= 60 * 24 * 7;
        break;

      case 'years':
        time *= 60 * 24 * 365;
        break;
    }
    return time * scale;
  }
  timeSlotCollectionGeneratedMOC(): ITimeSlotList[] {
    const timeSlotCollection = [];
    for (let type of ['minutes', 'hours', 'days', 'weeks', 'years']) {
      const start = new Date();
      const timeSlots = [];
      const items = Math.floor(Math.random() * 30) + 1;
      let timeShift = 0;
      for (let i = 1; i <= items; i++) {
        const duration = this.generatedTimeShift(type as unitsType);
        timeSlots.push({
          id: i,
          label: this.generatedName,
          start: new Date(new Date(start.getTime() + timeShift)),
          end: new Date(new Date(start.getTime() + timeShift + duration)),
          meta: {
            color: this.generatedColors,
          },
        } as ITimeSlot);
        timeShift += duration;
      }
      timeSlotCollection.push({
        id: 0,
        label: type,
        slots: timeSlots,
      } as ITimeSlotList);
    }
    console.log(timeSlotCollection);
    return timeSlotCollection;
  }
  timeSlotCollectionTestMOC(): ITimeSlotList[] {
    return [
      {
        id: 0,
        label: 'Line 1',
        slots: [
          {
            id: 0,
            label: 'test 0-0',
            start: new Date('2024-03-25T17:00:00.000Z'),
            end: new Date('2024-03-25T18:00:00.000Z'),
          },
          {
            id: 1,
            label: 'test 0-1',
            start: new Date('2024-03-25T18:00:00.000Z'),
            end: new Date('2024-03-25T19:00:00.000Z'),
          },
        ],
      },
      {
        id: 1,
        label: 'Line 2',
        slots: [
          {
            id: 0,
            label: 'test 1-0',
            start: new Date('2024-03-25T12:00:00.000Z'),
            end: new Date('2024-03-31T12:00:00.000Z'),
            meta: {
              color: '#bde1d5',
            },
          },
          {
            id: 1,
            label: 'test 1-1',
            start: new Date('2024-04-01T12:00:00.000Z'),
            end: new Date('2024-05-01T12:00:00.000Z'),
            meta: {
              color: '#fbdcd4',
            },
          },
        ],
      },
      {
        id: 2,
        label: 'Line 2',
        slots: [
          {
            id: 0,
            label: 'test 2-0',
            start: new Date('2024-03-25T12:00:00.000Z'),
            end: new Date('2024-12-31T23:59:59.000Z'),
            meta: {
              color: '#fbdcd4',
            },
          },
          {
            id: 1,
            label: 'test 2-1',
            start: new Date('2025-01-01T00:00:00.000Z'),
            end: new Date('2030-03-25T12:00:00.000Z'),
          },
        ],
      },
    ] as ITimeSlotList[];
  }

  tickSound(): void {
    const beepSound = new Audio('./assets/clock-tick-sfx.mp3');
    beepSound.play();
  }
}

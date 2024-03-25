import { Component, signal, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SceneComponent } from './components/scene/scene.component';
import { ITimeSlotList } from './components/scene/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SceneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  timeSlotCollection = [
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

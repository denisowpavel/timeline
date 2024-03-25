import {ChangeDetectionStrategy, Component, input, InputSignal} from '@angular/core';
import {ITimeSlot} from "../../types";

@Component({
  selector: 'tl-slot',
  standalone: true,
  imports: [],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotComponent {
  timeSlot: InputSignal<ITimeSlot> = input({
    id: 0,
    label: '',
    start: new Date(),
    end: new Date(),
  });
}

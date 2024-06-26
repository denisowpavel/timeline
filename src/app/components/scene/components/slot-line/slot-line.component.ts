import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SlotComponent } from '../slot/slot.component';
import { ITimeSlotList } from '../../types';

@Component({
  selector: 'tl-slot-line',
  standalone: true,
  imports: [SlotComponent],
  templateUrl: './slot-line.component.html',
  styleUrl: './slot-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotLineComponent {
  @Input() list?: ITimeSlotList;
}

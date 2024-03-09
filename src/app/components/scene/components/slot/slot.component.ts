import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'tl-slot',
  standalone: true,
  imports: [],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlotComponent {

}

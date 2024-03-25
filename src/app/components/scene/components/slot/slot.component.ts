import {ChangeDetectionStrategy, Component, computed, input, InputSignal, Signal} from '@angular/core';
import {ITimeSlot} from "../../types";
import {SceneViewService} from "../../services/scene-view.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'tl-slot',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotComponent {
  timeSlot: InputSignal<ITimeSlot> = input({
    id: 0,
    label: '',
    start: new Date(),
    end: new Date(),
  });
  public currentSlotLeft: Signal<number> = computed((): number => {
    const left = this.sceneViewService.elementStyleLeft(this.timeSlot().start);
    return left;
  });

  public currentSlotWidth: Signal<number> = computed((): number => {
    const width = this.sceneViewService.elementStyleLeft(this.timeSlot().end);
    return width - this.currentSlotLeft();
  });
  constructor(public sceneViewService: SceneViewService) {}
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  Signal,
} from '@angular/core';
import { JsonPipe, NgIf, NgClass } from '@angular/common';
import { SceneViewService } from '../../services/scene-view.service';
import { EnumeratePipe } from '../../../../pipes/enumerate.pipe';
import { ISceneRuler } from '../../types/tl-scene';
import { RulerUnitLabelPipe } from './pipes/ruler-unit-label.pipe';
import { RulerUnitTimePipe } from './pipes/ruler-unit-time.pipe';
import { TimeRulerService } from './servises/time-ruler.service';
@Component({
  selector: 'tl-time-ruler',
  standalone: true,
  imports: [
    JsonPipe,
    EnumeratePipe,
    NgIf,
    NgClass,
    RulerUnitLabelPipe,
    RulerUnitTimePipe,
  ],
  templateUrl: './time-ruler.component.html',
  styleUrl: './time-ruler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRulerComponent {
  public ruler?: ISceneRuler;

  public startTime: Signal<Date> = computed(() => {
    return this.sceneViewService.view().startTime;
  });

  constructor(
    public sceneViewService: SceneViewService,
    public timeRulerService: TimeRulerService,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      this.ruler = this.sceneViewService.sceneRuler();
      this.cdr.markForCheck();
    });
  }
}

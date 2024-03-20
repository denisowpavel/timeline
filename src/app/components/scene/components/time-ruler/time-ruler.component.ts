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

  public firstUnitWidth: Signal<number> = computed(() => {
    const ruler = this.sceneViewService.sceneRuler();
    if (ruler?.units === 'minutes') {
      const secondLeft = 60 - this.startTime().getSeconds();
      return (ruler?.pxInUnit / 60) * secondLeft || 0;
    }
    return ruler?.pxInUnit || 0;
  });

  constructor(
    public sceneViewService: SceneViewService,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      this.ruler = this.sceneViewService.sceneRuler();
      this.cdr.markForCheck();
    });
  }
}

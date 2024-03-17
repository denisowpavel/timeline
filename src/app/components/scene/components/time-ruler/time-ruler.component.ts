import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
} from '@angular/core';
import { JsonPipe, NgIf } from '@angular/common';
import { SceneViewService } from '../../services/scene-view.service';
import { EnumeratePipe } from '../../../../pipes/enumerate.pipe';
import { ISceneRuler } from '../../types/tl-scene';
@Component({
  selector: 'tl-time-ruler',
  standalone: true,
  imports: [JsonPipe, EnumeratePipe, NgIf],
  templateUrl: './time-ruler.component.html',
  styleUrl: './time-ruler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRulerComponent {
  public unitInLine?: ISceneRuler;

  constructor(
    public sceneViewService: SceneViewService,
    private cdr: ChangeDetectorRef,
  ) {
    effect(() => {
      this.unitInLine = this.sceneViewService.unitInLine();
      this.cdr.markForCheck();
    });
  }
}

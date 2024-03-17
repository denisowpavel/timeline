import {
  ChangeDetectionStrategy,
  Component,
  effect,
} from '@angular/core';
import { JsonPipe, } from '@angular/common';
import { SceneViewService } from '../../services/scene-view.service';
import { EnumeratePipe } from '../../../../pipes/enumerate.pipe';
@Component({
  selector: 'tl-time-ruler',
  standalone: true,
  imports: [JsonPipe, EnumeratePipe],
  templateUrl: './time-ruler.component.html',
  styleUrl: './time-ruler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRulerComponent {
  constructor(public sceneViewService: SceneViewService) {
    effect(() => {
      const a = this.sceneViewService.unitInLine();
    });
  }
}

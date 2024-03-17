import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  Input,
} from '@angular/core';
import { TlSceneView } from '../../types/tl-scene';
import { JsonPipe, } from '@angular/common';
import { INITIAL_SCENE_VIEW } from '../../types/const';
import { SceneViewService } from '../../services/scene-view.service';
import { EnumeratePipe } from '../../../../pipes/enumerate.pipe';
import {  } from '@angular/common';
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
      const a = this.sceneViewService.minutesInLine();
      console.log('<<', Math.trunc(a), a);
    });
  }
}

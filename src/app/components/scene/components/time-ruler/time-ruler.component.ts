import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  Input,
} from '@angular/core';
import { TlSceneView } from '../../types/tl-scene';
import { JsonPipe } from '@angular/common';
import { INITIAL_SCENE_VIEW } from '../../types/const';
import { SceneViewService } from '../../services/scene-view.service';

@Component({
  selector: 'tl-time-ruler',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './time-ruler.component.html',
  styleUrl: './time-ruler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRulerComponent {

  constructor(public sceneViewService: SceneViewService) {
    effect(() => {
      console.log('<<', this.sceneViewService.width());
    });
  }
}

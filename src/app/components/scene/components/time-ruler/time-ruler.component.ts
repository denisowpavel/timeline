import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TlSceneView } from '../../types/tl-scene';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'tl-time-ruler',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './time-ruler.component.html',
  styleUrl: './time-ruler.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeRulerComponent {
  @Input() sceneView?: TlSceneView;
}

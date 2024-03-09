import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SlotLineComponent } from './components/slot-line/slot-line.component';
import { TimeRulerComponent } from './components/time-ruler/time-ruler.component';
import { TlSceneView } from './types/tl-scene';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'tl-scene',
  standalone: true,
  imports: [SlotLineComponent, TimeRulerComponent, JsonPipe],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent implements OnInit {
  public view?: TlSceneView;

  ngOnInit() {
    this.view = { scale: 1, startTime: new Date(), currentTime: new Date() };
  }

  protected readonly JsonPipe = JsonPipe;
}

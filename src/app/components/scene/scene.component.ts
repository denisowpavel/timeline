import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { SlotLineComponent } from './components/slot-line/slot-line.component';
import { TimeRulerComponent } from './components/time-ruler/time-ruler.component';
import { TlSceneView } from './types/tl-scene';
import { JsonPipe } from '@angular/common';
import { INITIAL_SCENE_VIEW } from './types/const';

@Component({
  selector: 'tl-scene',
  standalone: true,
  imports: [SlotLineComponent, TimeRulerComponent, JsonPipe],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent implements OnInit {
  public view = signal<TlSceneView>(INITIAL_SCENE_VIEW);
  @HostListener('document:mousewheel', ['$event']) onScrollEvent(
    event: WheelEvent,
  ): void {
    if (!event.shiftKey && !event.altKey && event.deltaY !== 0) {
      this.updateScale(event.deltaY);
    }
    if (event.deltaX !== 0 || (event.deltaY !== 0 && event.shiftKey)) {
      this.updateStartTime(event.deltaX || event.deltaY);
    }
  }

  ngOnInit() {}
  updateScale(delta: number) {
    this.view.update((view) => ({ ...view, scale: (view.scale += delta) }));
  }
  updateStartTime(delta: number) {
    this.view.update((view) => {
      const timestamp = Math.floor(view.startTime.getTime() / 1000);
      return { ...view, startTime: new Date((timestamp + delta) * 1000) };
    });
  }

  protected readonly JsonPipe = JsonPipe;
}

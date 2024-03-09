import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
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
  ngOnInit() {
    this.view = { scale: 1, startTime: new Date(), currentTime: new Date() };
  }
  updateScale(delta: number) {
    if (!this.view) {
      return;
    }
    this.view.scale += delta;
  }
  updateStartTime(delta: number) {
    if (!this.view) {
      return;
    }
    const timestamp = Math.floor(this.view.startTime.getTime() / 1000)
    this.view.startTime.setTime((timestamp + delta)*1000);
  }

  protected readonly JsonPipe = JsonPipe;
}

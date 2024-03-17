import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
} from '@angular/core';
import { SlotLineComponent } from './components/slot-line/slot-line.component';
import { TimeRulerComponent } from './components/time-ruler/time-ruler.component';
import { JsonPipe } from '@angular/common';
import { SceneViewService } from './services/scene-view.service';

@Component({
  selector: 'tl-scene',
  standalone: true,
  imports: [SlotLineComponent, TimeRulerComponent, JsonPipe],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent implements OnInit, AfterViewInit {
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
  @HostListener('window:resize', ['$event']) onComponentResize() {
    this.sceneViewService.width.set(
      this.elementRef.nativeElement.getBoundingClientRect().width,
    );
  }
  constructor(
    public sceneViewService: SceneViewService,
    private elementRef: ElementRef,
  ) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.sceneViewService.width.set(
      this.elementRef.nativeElement.getBoundingClientRect().width,
    );
  }
  updateScale(delta: number) {
    if (delta === 0) {
      return;
    }
    this.sceneViewService.updateViewScale(delta);
  }

  updateStartTime(delta: number) {
    this.sceneViewService.view.update((view) => {
      const timestamp = Math.floor(view.startTime.getTime() / 1000);
      return { ...view, startTime: new Date((timestamp + delta) * 1000) };
    });
  }

  protected readonly JsonPipe = JsonPipe;
}

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { SlotLineComponent } from './components/slot-line/slot-line.component';
import { TimeRulerComponent } from './components/time-ruler/time-ruler.component';
import { JsonPipe } from '@angular/common';
import { SceneViewService } from './services/scene-view.service';
import { ITimeSlotList } from './types';

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
    // if (event.shiftKey && event.altKey && event.deltaY !== 0) {
    if (!event.shiftKey && !event.altKey && event.deltaY !== 0) {
      // TODO: add zone-flags to polyfills and use event.preventDefault() + altKey only;
      // this.updateScale(event.deltaY);
      this.updateStartTime(event.deltaY);
    }
    if (event.deltaX !== 0 || (event.deltaY !== 0 && event.shiftKey && !event.altKey)) {
      // this.updateStartTime(event.deltaX || event.deltaY);
      this.updateScale(event.deltaX || event.deltaY);
    }
  }
  @HostListener('window:resize', ['$event']) onComponentResize() {
    this.sceneViewService.width.set(
      this.elementRef.nativeElement.getBoundingClientRect().width,
    );
  }
  @Input() slotCollection?: ITimeSlotList[];

  constructor(
    public sceneViewService: SceneViewService,
    private elementRef: ElementRef,
  ) {}
  ngOnInit() {}
  ngAfterViewInit() {
    this.sceneViewService.width.set(
      this.elementRef.nativeElement.getBoundingClientRect().width,
    );
  }
  updateScale(delta: number) {
    this.sceneViewService.updateViewScale(delta);
  }

  updateStartTime(delta: number) {
    this.sceneViewService.updateStartTime(delta);
  }

  protected readonly JsonPipe = JsonPipe;
}

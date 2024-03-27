import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SlotLineComponent } from './components/slot-line/slot-line.component';
import { TimeRulerComponent } from './components/time-ruler/time-ruler.component';
import { JsonPipe } from '@angular/common';
import { SceneViewService } from './services/scene-view.service';
import { ITimeSlotList, unitsType } from './types';
import { SceneHelpersService } from './services/scene-helpers.service';
import {
  interval,
  map,
  merge,
  Observable,
  Subject,
} from 'rxjs';

const INITIAL_SCENE_SHIFT = -1;
@Component({
  selector: 'tl-scene',
  standalone: true,
  imports: [SlotLineComponent, TimeRulerComponent, JsonPipe],
  templateUrl: './scene.component.html',
  styleUrl: './scene.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SceneComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroyed$ = new Subject();
  @HostListener('document:mousewheel', ['$event']) onScrollEvent(
    event: WheelEvent,
  ): void {
    // if (event.shiftKey && event.altKey && event.deltaY !== 0) {
    if (!event.shiftKey && !event.altKey && event.deltaY !== 0) {
      // TODO: add zone-flags to polyfills and use event.preventDefault() + altKey only;
      // this.updateScale(event.deltaY);
      this.updateStartTime(event.deltaY);
    }
    if (
      event.deltaX !== 0 ||
      (event.deltaY !== 0 && event.shiftKey && !event.altKey)
    ) {
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
    private sceneHelpersService: SceneHelpersService,
  ) {}
  ngOnInit() {
    this.sceneViewService.updateStartTime(INITIAL_SCENE_SHIFT);

    const $currentTimeUpdateTick: Observable<unitsType> = merge(
      interval(1000).pipe(map(() => 'minutes' as unitsType)),
      interval(1000 * 60).pipe(map(() => 'hours' as unitsType)),
      interval(1000 * 60 * 60).pipe(map(() => 'days' as unitsType)),
    );
    $currentTimeUpdateTick.subscribe((type) => {
      if (type === this.sceneViewService.sceneRuler().units) {
        this.sceneHelpersService.tickSound(); // FOR DEBUG ONLY
        this.sceneViewService.resetCurrentTime();
      }
    });
  }
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
  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
  protected readonly JsonPipe = JsonPipe;
}

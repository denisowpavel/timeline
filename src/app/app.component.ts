import {Component, OnInit, signal, Signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SceneComponent } from './components/scene/scene.component';
import { ITimeSlotList } from './components/scene/types';
import {SceneHelpersService} from "./components/scene/services/scene-helpers.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SceneComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  timeSlotCollection: ITimeSlotList[] = [];

  constructor(private sceneHelpersService: SceneHelpersService) {
  }
  ngOnInit() {
    this.timeSlotCollection = this.sceneHelpersService.timeSlotCollectionGeneratedMOC();
  }
}

import { TestBed } from '@angular/core/testing';

import { SceneViewService } from './scene-view.service';

describe('SceneViewService', () => {
  let service: SceneViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceneViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

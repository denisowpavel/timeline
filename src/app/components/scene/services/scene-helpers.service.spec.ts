import { TestBed } from '@angular/core/testing';

import { SceneHelpersService } from './scene-helpers.service';

describe('SceneHelpersService', () => {
  let service: SceneHelpersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SceneHelpersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

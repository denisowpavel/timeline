import { TestBed } from '@angular/core/testing';

import { TimeRulerService } from './time-ruler.service';

describe('TimeRulerService', () => {
  let service: TimeRulerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeRulerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

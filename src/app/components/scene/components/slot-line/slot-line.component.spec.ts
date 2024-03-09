import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotLineComponent } from './slot-line.component';

describe('SlotLineComponent', () => {
  let component: SlotLineComponent;
  let fixture: ComponentFixture<SlotLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlotLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

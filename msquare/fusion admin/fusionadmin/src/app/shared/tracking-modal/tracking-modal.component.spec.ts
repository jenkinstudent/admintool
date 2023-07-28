import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingModalComponent } from './tracking-modal.component';

describe('TrackingModalComponent', () => {
  let component: TrackingModalComponent;
  let fixture: ComponentFixture<TrackingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

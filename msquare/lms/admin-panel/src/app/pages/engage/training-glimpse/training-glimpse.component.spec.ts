import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingGlimpseComponent } from './training-glimpse.component';

describe('TrainingGlimpseComponent', () => {
  let component: TrainingGlimpseComponent;
  let fixture: ComponentFixture<TrainingGlimpseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingGlimpseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingGlimpseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

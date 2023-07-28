import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityWallComponent } from './activity-wall.component';

describe('ActivityWallComponent', () => {
  let component: ActivityWallComponent;
  let fixture: ComponentFixture<ActivityWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityWallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

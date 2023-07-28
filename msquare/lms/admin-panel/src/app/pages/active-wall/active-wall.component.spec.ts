import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWallComponent } from './active-wall.component';

describe('ActiveWallComponent', () => {
  let component: ActiveWallComponent;
  let fixture: ComponentFixture<ActiveWallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveWallComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveWallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

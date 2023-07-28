import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityDashboardComponent } from './utility-dashboard.component';

describe('UtilityDashboardComponent', () => {
  let component: UtilityDashboardComponent;
  let fixture: ComponentFixture<UtilityDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

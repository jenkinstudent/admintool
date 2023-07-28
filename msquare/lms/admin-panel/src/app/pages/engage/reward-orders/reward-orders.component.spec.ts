import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardOrdersComponent } from './reward-orders.component';

describe('RewardOrdersComponent', () => {
  let component: RewardOrdersComponent;
  let fixture: ComponentFixture<RewardOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

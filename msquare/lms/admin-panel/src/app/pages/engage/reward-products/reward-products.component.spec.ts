import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardProductsComponent } from './reward-products.component';

describe('RewardProductsComponent', () => {
  let component: RewardProductsComponent;
  let fixture: ComponentFixture<RewardProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RewardProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

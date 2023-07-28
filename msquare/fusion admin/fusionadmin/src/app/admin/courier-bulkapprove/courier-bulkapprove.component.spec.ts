import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierBulkapproveComponent } from './courier-bulkapprove.component';

describe('CourierBulkapproveComponent', () => {
  let component: CourierBulkapproveComponent;
  let fixture: ComponentFixture<CourierBulkapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierBulkapproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierBulkapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

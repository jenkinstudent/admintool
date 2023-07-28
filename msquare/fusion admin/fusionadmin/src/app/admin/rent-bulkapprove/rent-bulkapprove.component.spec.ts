import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBulkapproveComponent } from './rent-bulkapprove.component';

describe('RentBulkapproveComponent', () => {
  let component: RentBulkapproveComponent;
  let fixture: ComponentFixture<RentBulkapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentBulkapproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBulkapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

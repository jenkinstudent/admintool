import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityBulkapproveComponent } from './utility-bulkapprove.component';

describe('UtilityBulkapproveComponent', () => {
  let component: UtilityBulkapproveComponent;
  let fixture: ComponentFixture<UtilityBulkapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityBulkapproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityBulkapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

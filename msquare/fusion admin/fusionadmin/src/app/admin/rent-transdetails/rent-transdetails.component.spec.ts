import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentTransdetailsComponent } from './rent-transdetails.component';

describe('RentTransdetailsComponent', () => {
  let component: RentTransdetailsComponent;
  let fixture: ComponentFixture<RentTransdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentTransdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentTransdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

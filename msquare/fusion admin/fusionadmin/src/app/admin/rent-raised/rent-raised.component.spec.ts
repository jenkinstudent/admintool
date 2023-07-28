import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentRaisedComponent } from './rent-raised.component';

describe('RentRaisedComponent', () => {
  let component: RentRaisedComponent;
  let fixture: ComponentFixture<RentRaisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentRaisedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentRaisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

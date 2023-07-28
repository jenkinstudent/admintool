import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentTransactionComponent } from './rent-transaction.component';

describe('RentTransactionComponent', () => {
  let component: RentTransactionComponent;
  let fixture: ComponentFixture<RentTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

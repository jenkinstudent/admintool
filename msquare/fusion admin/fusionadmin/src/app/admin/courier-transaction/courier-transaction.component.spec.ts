import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierTransactionComponent } from './courier-transaction.component';

describe('CourierTransactionComponent', () => {
  let component: CourierTransactionComponent;
  let fixture: ComponentFixture<CourierTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourierTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

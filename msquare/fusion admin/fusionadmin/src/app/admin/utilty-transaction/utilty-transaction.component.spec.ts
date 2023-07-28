import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtiltyTransactionComponent } from './utilty-transaction.component';

describe('UtiltyTransactionComponent', () => {
  let component: UtiltyTransactionComponent;
  let fixture: ComponentFixture<UtiltyTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtiltyTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtiltyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilityTransdetailsComponent } from './utility-transdetails.component';

describe('UtilityTransdetailsComponent', () => {
  let component: UtilityTransdetailsComponent;
  let fixture: ComponentFixture<UtilityTransdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UtilityTransdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityTransdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

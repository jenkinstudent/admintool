import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterMasterComponent } from './meter-master.component';

describe('MeterMasterComponent', () => {
  let component: MeterMasterComponent;
  let fixture: ComponentFixture<MeterMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaisedComponent } from './raised.component';

describe('RaisedComponent', () => {
  let component: RaisedComponent;
  let fixture: ComponentFixture<RaisedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaisedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

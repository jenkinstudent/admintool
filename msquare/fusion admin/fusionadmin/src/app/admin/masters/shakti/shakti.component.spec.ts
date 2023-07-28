import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaktiComponent } from './shakti.component';

describe('ShaktiComponent', () => {
  let component: ShaktiComponent;
  let fixture: ComponentFixture<ShaktiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShaktiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaktiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

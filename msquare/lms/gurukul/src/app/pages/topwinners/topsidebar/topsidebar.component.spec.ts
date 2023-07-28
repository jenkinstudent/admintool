import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopsidebarComponent } from './topsidebar.component';

describe('TopsidebarComponent', () => {
  let component: TopsidebarComponent;
  let fixture: ComponentFixture<TopsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopsidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

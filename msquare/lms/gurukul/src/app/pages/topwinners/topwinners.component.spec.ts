import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopwinnersComponent } from './topwinners.component';

describe('TopwinnersComponent', () => {
  let component: TopwinnersComponent;
  let fixture: ComponentFixture<TopwinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopwinnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopwinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

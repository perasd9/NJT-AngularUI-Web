import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarCalendarComponent } from './topbar-calendar.component';

describe('TopbarCalendarComponent', () => {
  let component: TopbarCalendarComponent;
  let fixture: ComponentFixture<TopbarCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarCalendarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopbarCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

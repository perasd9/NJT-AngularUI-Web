import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationUserCardComponent } from './notification-user-card.component';

describe('NotificationUserCardComponent', () => {
  let component: NotificationUserCardComponent;
  let fixture: ComponentFixture<NotificationUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationUserCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

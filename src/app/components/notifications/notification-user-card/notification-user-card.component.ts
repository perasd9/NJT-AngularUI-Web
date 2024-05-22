import { Component, Input } from '@angular/core';
import { User } from '../../../model/User';

@Component({
  selector: 'app-notification-user-card',
  standalone: true,
  imports: [],
  templateUrl: './notification-user-card.component.html',
  styleUrl: '../notification-card/notification-card.component.scss',
})
export class NotificationUserCardComponent {
  @Input({ required: true })
  userNotification!: User;
}

import { Component, Input } from '@angular/core';
import { Reservation } from '../../../model/Reservation';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss',
})
export class NotificationCardComponent {
  @Input({ required: true })
  reservationNotification!: Reservation;
}

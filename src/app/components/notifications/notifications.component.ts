import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../../model/Reservation';
import { Hall } from '../../model/Hall';
import { ReservationService } from '../reservations/services/reservation.service';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [NotificationCardComponent, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(
    private router: Router,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservationsRequests().subscribe(
      (res) => {
        this.reservations = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  reservationEmitter() {
    this.ngOnInit();
  }
}

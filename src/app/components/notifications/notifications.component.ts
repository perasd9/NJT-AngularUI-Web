import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Reservation } from '../../model/Reservation';
import { Hall } from '../../model/Hall';
import { ReservationService } from '../reservations/services/reservation.service';
import { NotificationCardComponent } from './notification-card/notification-card.component';
import { CommonModule } from '@angular/common';
import { User } from '../../model/User';
import { AuthService } from '../../guards/auth.service';
import { NgToastService } from 'ng-angular-popup';
import { NotificationUserCardComponent } from './notification-user-card/notification-user-card.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    NotificationCardComponent,
    CommonModule,
    NotificationUserCardComponent,
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent implements OnInit {
  reservations: Reservation[] = [];
  users: User[] = [];

  @Output()
  reduceNotificationCount: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private router: Router,
    private reservationService: ReservationService,
    private authService: AuthService,
    private toast: NgToastService
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
    this.authService.getUsers().subscribe(
      (res) => {
        this.users = res.body!;
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Korisnici ne mogu biti ucitani!',
          duration: 1500,
        });
      }
    );
  }

  notificationEmitter() {
    this.ngOnInit();
    this.reduceNotificationCount.emit();
  }
}

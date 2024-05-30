import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from '../../../model/Reservation';
import { ReservationService } from '../../reservations/services/reservation.service';
import { NgToastService } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';
import { ReservationsComponent } from '../../reservations/reservations.component';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-card.component.html',
  styleUrl: './notification-card.component.scss',
})
export class NotificationCardComponent {
  @Input({ required: true })
  reservationNotification!: Reservation;

  @Output()
  notificationEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  viewNotification: EventEmitter<Reservation> = new EventEmitter<Reservation>();

  constructor(
    private reservationService: ReservationService,
    private toast: NgToastService
  ) {}

  // handlePrihvatiRezervaciju() {
  //   this.reservationService
  //     .acceptReservationRequest(this.reservationNotification)
  //     .subscribe(
  //       (res) => {
  //         if (res.status == 200) {
  //           this.notificationEmitter.emit();
  //           this.toast.success({
  //             detail: 'Success',
  //             summary: 'Rezervacija je prihvacena!',
  //             duration: 3000,
  //           });
  //         }
  //       },
  //       (err) => {
  //         console.log(err);
  //       }
  //     );
  // }

  handleOdbijRezervaciju() {
    this.reservationService
      .denyReservationRequest(this.reservationNotification)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.notificationEmitter.emit();
            this.toast.success({
              detail: 'Success',
              summary: 'Rezervacija je odbijena!',
              duration: 1500,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  handleViewReservation() {
    this.viewNotification.emit(this.reservationNotification);
  }
}

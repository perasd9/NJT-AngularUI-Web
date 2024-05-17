import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from '../../../model/Reservation';
import { ReservationService } from '../../reservations/services/reservation.service';
import { NgToastService } from 'ng-angular-popup';

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

  @Output()
  reservationEmitter: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private reservationService: ReservationService,
    private toast: NgToastService
  ) {}

  handlePrihvatiRezervaciju() {
    this.reservationService
      .acceptReservationRequest(this.reservationNotification)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.reservationEmitter.emit();
            this.toast.success({
              detail: 'Success',
              summary: 'Rezervacija je prihvacena!',
              duration: 3000,
            });
          }
        },
        (err) => {
          console.log(err);
        }
      );
  }

  handleOdbijRezervaciju() {
    this.reservationService
      .denyReservationRequest(this.reservationNotification)
      .subscribe(
        (res) => {
          if (res.status == 200) {
            this.reservationEmitter.emit();
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
}

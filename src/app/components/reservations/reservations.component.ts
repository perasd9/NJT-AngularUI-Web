import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ReservationService } from './services/reservation.service';
import { Reservation } from '../../model/Reservation';
import { HallService } from '../halls/services/hall.service';
import { Hall } from '../../model/Hall';
import { CommonModule } from '@angular/common';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ReservationStatus } from '../../model/ReservationStatus';
import { User } from '../../model/User';

@Component({
  selector: 'app-reservations',
  standalone: true,
  imports: [CommonModule, AddReservationComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss',
})
export class ReservationsComponent implements OnInit, OnChanges {
  reservations: Reservation[] = [];
  halls: Hall[] = [];

  @Input({ required: true })
  selectedDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  @ViewChild('addReservationComponent')
  addReservationComponent!: AddReservationComponent;

  hours: Date[] = this.generateTimeSlots(this.selectedDate);

  constructor(
    private reservationService: ReservationService,
    private hallService: HallService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      this.hours = this.generateTimeSlots(this.selectedDate);

      this.reservationService.getReservations(this.selectedDate).subscribe(
        (res) => {
          this.reservations = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  ngOnInit(): void {
    this.reservationService.getReservations(this.selectedDate).subscribe(
      (res) => {
        this.reservations = res;
      },
      (err) => {
        console.log(err);
      }
    );

    this.hallService.getActiveHalls().subscribe(
      (res) => {
        this.halls = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  private generateTimeSlots(date: Date): Date[] {
    const timeSlots: Date[] = [];
    const startHour = 8;
    const endHour = 20;

    date.setHours(0, 0, 0, 0);

    for (let hour = startHour; hour <= endHour; hour++) {
      const timeSlot = new Date(date);
      timeSlot.setHours(hour);
      timeSlots.push(timeSlot);
    }

    return timeSlots;
  }

  isReserved(hall: Hall, hour: Date): boolean {
    this.selectedDate.setHours(hour.getHours());

    const reservation = this.reservations.find(
      (r) =>
        r.sala!.id === hall.id &&
        r.vremeDatum?.getTime() === this.selectedDate.getTime() &&
        r.statusRezervacije?.id == 1
    );
    return reservation !== undefined;
  }

  getReservationData(hall: Hall, hour: Date): string {
    this.selectedDate.setHours(hour.getHours());

    const reservation = this.reservations.find(
      (r) =>
        r.sala!.id === hall.id &&
        r.vremeDatum?.getTime() === this.selectedDate.getTime()
    );
    return reservation ? reservation.user?.username?.toString()! : '';
  }

  getReservation(hall: Hall | undefined, hour: Date): Reservation {
    this.selectedDate.setHours(hour.getHours());

    const reservation = this.reservations.find(
      (r) =>
        r.sala!.id === hall?.id &&
        r.vremeDatum?.getTime() === this.selectedDate.getTime()
    );

    if (reservation != undefined) {
      reservation.sala = this.addReservationComponent.halls.find((hall) => {
        return hall.id == reservation.sala!.id;
      });
      reservation.vremeDatum = this.hours.find((hour) => {
        return hour.getTime() === reservation.vremeDatum?.getTime();
      });
    }

    return reservation
      ? reservation
      : new Reservation(
          0,
          '',
          '',
          this.addReservationComponent.halls[0],
          0,
          new ReservationStatus(0, ''),
          0,
          new User(0, '', '', '', '', false, false, 'user'),
          0,
          this.hours[11]
        );
  }

  showAddReservationModal(reservation: Reservation) {
    if (reservation) {
      this.addReservationComponent.reservation = reservation;
    }
    this.addReservationComponent.addReservation.nativeElement.style.display =
      'block';
  }

  reservationUpdated() {
    this.ngOnInit();
  }

  cancelReservationModal(reservation: Reservation) {
    //will be changed
    this.showAddReservationModal(reservation);
  }
}

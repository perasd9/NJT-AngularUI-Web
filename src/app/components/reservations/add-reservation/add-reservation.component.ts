import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { HallService } from '../../halls/services/hall.service';
import { Hall } from '../../../model/Hall';
import { Reservation } from '../../../model/Reservation';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { ReservationStatus } from '../../../model/ReservationStatus';
import { User } from '../../../model/User';

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-reservation.component.html',
  styleUrl: './add-reservation.component.scss',
})
export class AddReservationComponent implements OnInit {
  @ViewChild('addReservationModal')
  addReservation!: ElementRef;

  halls!: Hall[];

  @Input({ required: false })
  reservation: Reservation = new Reservation(
    0,
    '',
    '',
    undefined,
    0,
    new ReservationStatus(0, ''),
    0,
    new User(0, '', '', '', '', false, false),
    0,
    undefined
  );

  constructor(
    private reservationService: ReservationService,
    private hallService: HallService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.hallService.getActiveHalls().subscribe(
      (res) => {
        this.halls = res.body;
        this.reservation.sala = this.halls[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUserFromLocalStorage() {
    return localStorage.getItem('user');
  }
  handleCloseAddReservationModal() {
    this.addReservation.nativeElement.style.display = 'none';
  }

  handleRezervisi() {
    this.reservation.user!.id = 1;
    this.reservationService.sendReservationRequest(this.reservation).subscribe(
      (res) => {
        if (res.status == 200) {
          this.addReservation.nativeElement.style.display = 'none';

          this.toast.success({
            detail: 'Success',
            summary: 'Zahtev za rezervaciju je uspesno poslat!',
            duration: 3000,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { HallService } from '../../halls/services/hall.service';
import { Hall } from '../../../model/Hall';
import { Reservation } from '../../../model/Reservation';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
  reservation: Reservation = new Reservation(
    0,
    undefined,
    0,
    undefined,
    0,
    undefined,
    0,
    undefined
  );

  constructor(
    private reservationService: ReservationService,
    private hallService: HallService
  ) {}

  ngOnInit(): void {
    this.hallService.getHalls().subscribe(
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
}

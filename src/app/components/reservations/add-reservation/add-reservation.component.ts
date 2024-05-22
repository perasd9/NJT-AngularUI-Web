import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { HallService } from '../../halls/services/hall.service';
import { Hall } from '../../../model/Hall';
import { Reservation } from '../../../model/Reservation';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { ReservationStatus } from '../../../model/ReservationStatus';
import { User } from '../../../model/User';
import { AuthService } from '../../../guards/auth.service';
import { NotificationService } from '../../notifications/service/notification.service';

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

  @Output()
  reservationUpated: EventEmitter<any> = new EventEmitter<any>();

  @Input({ required: true })
  hours!: Date[];

  @Input({ required: false })
  reservation: Reservation = new Reservation(
    0,
    '',
    '',
    undefined,
    0,
    new ReservationStatus(0, ''),
    0,
    new User(0, '', '', '', '', false, false, 'user'),
    0,
    undefined
  );

  constructor(
    private reservationService: ReservationService,
    private hallService: HallService,
    private toast: NgToastService,
    public authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.hallService.getActiveHalls().subscribe(
      (res) => {
        this.halls = res.body;
        this.reservation.sale = this.halls;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUserFromAuth() {
    return this.authService.getUser().username;
  }
  handleCloseAddReservationModal() {
    this.addReservation.nativeElement.style.display = 'none';
  }

  handleRezervisi() {
    this.reservation.user!.id = this.authService.getUser().id;
    this.reservationService.sendReservationRequest(this.reservation).subscribe(
      (res) => {
        if (res.status == 200) {
          this.addReservation.nativeElement.style.display = 'none';

          if (JSON.parse(localStorage.getItem('user')!)?.role == 'USER') {
            this.notificationService.sendNotification().subscribe((res) => {});
          }

          this.toast.success({
            detail: 'Success',
            summary: 'Zahtev za rezervaciju je uspesno poslat!',
            duration: 1500,
          });
        } else if (res.status == 400) {
          this.toast.error({
            detail: 'Success',
            summary: 'Zahtev za rezervaciju ne moze biti poslat!',
            duration: 1500,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleUpdateReservation() {
    this.reservation.user!.id = this.authService.getUser().id;
    this.reservationService.updateReservation(this.reservation).subscribe(
      (res) => {
        if (res.status == 200) {
          this.reservationUpated.emit();
          this.addReservation.nativeElement.style.display = 'none';

          this.toast.success({
            detail: 'Success',
            summary: 'Rezervacija je uspesno izmenjena i zahtev je poslat!',
            duration: 1500,
          });
        } else if (res.status == 400) {
          this.toast.error({
            detail: 'Error',
            summary: 'Izmena rezervacije nije moguca!',
            duration: 1500,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  handleCloseReservation() {
    this.reservation.user!.id = this.authService.getUser().id;
    this.reservationService.closeReservation(this.reservation).subscribe(
      (res) => {
        if (res.status == 200) {
          this.reservationUpated.emit();
          this.addReservation.nativeElement.style.display = 'none';

          this.toast.success({
            detail: 'Success',
            summary: 'Rezervacija je uspesno izmenjena i zahtev je poslat!',
            duration: 1500,
          });
        } else if (res.status == 400) {
          this.toast.error({
            detail: 'Error',
            summary: 'Izmena rezervacije nije moguca!',
            duration: 1500,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  showOdjaviButton(): boolean {
    if (this.reservation.id != 0 && this.authService.isAdmin()) return true;
    else if (
      this.reservation.id != 0 &&
      this.authService.getUser().id == this.reservation.user?.id
    )
      return true;
    else return false;
  }
}

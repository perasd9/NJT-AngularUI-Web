import { Component, OnInit } from '@angular/core';
import { TopbarCalendarComponent } from '../home/topbar-calendar/topbar-calendar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../guards/auth.service';
import { ReservationService } from '../reservations/services/reservation.service';
import { NotificationService } from '../notifications/service/notification.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private notificationService: NotificationService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.reservationService.getReservationsRequests().subscribe((res) => {
      this.notificationCount += res.length;
    });
    this.authService.getUsers().subscribe((res) => {
      this.notificationCount += res.body!.length;
    });

    this.notificationService.notifications.subscribe((message) => {
      if (message == '') {
        this.notificationCount--;
      } else {
        this.notificationCount++;
        this.toast.info({
          detail: 'Info',
          summary: 'Stiglo je novo obavestenje!',
          duration: 4000,
        });
      }
    });
  }

  notificationCount: number = 0;

  isAdminLoggedIn(): boolean {
    return this.authService.isAdmin();
  }
}

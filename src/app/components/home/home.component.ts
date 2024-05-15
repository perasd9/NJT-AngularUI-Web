import { Component } from '@angular/core';
import { TopbarCalendarComponent } from './topbar-calendar/topbar-calendar.component';
import { ReservationsComponent } from '../reservations/reservations.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopbarCalendarComponent, ReservationsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );

  constructor(private router: Router) {
    if (localStorage.getItem('jwt') == null) {
      this.router.navigate(['/login']);
    }
  }
  getOutputSelectedDate(selectedDate: Date) {
    this.selectedDate = selectedDate;
  }
}

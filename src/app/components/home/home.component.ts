import { Component } from '@angular/core';
import { TopbarCalendarComponent } from './topbar-calendar/topbar-calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopbarCalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}

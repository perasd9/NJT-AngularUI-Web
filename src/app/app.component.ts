import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarCalendarComponent } from './components/home/topbar-calendar/topbar-calendar.component';
import { HomeComponent } from './components/home/home.component';
import { HallsComponent } from './components/halls/halls.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HomeComponent, HallsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rezervacija-sala';
}

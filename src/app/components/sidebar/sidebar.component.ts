import { Component } from '@angular/core';
import { TopbarCalendarComponent } from '../home/topbar-calendar/topbar-calendar.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../guards/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(private authService: AuthService) {}

  isAdminLoggedIn(): boolean {
    return this.authService.isAdmin();
  }
}

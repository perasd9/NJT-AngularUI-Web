import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { HallsComponent } from './components/halls/halls.component';
import { NgToastModule } from 'ng-angular-popup';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent,
    HomeComponent,
    HallsComponent,
    NgToastModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'rezervacija-sala';

  showSidebar: boolean = true;
  showMainPage: boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.showSidebar = !['/login', '/register'].includes(event.url ?? '');
          this.showMainPage = !['/register', '/login'].includes(
            event.url ?? ''
          );
        }
      });
  }
}

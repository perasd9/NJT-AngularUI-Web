import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HallsComponent } from './components/halls/halls.component';
import { AddHallComponent } from './components/halls/add-hall/add-hall.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'halls', component: HallsComponent },
  { path: 'add-hall', component: AddHallComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'login', component: LoginComponent },
];

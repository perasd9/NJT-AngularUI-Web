import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HallsComponent } from './components/halls/halls.component';
import { AddHallComponent } from './components/halls/add-hall/add-hall.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'halls',
    component: HallsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'add-hall',
    component: AddHallComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile-info',
    component: ProfileInfoComponent,
    canActivate: [AuthGuard],
  },
];

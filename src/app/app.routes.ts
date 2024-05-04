import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HallsComponent } from './components/halls/halls.component';
import { AddHallComponent } from './components/halls/add-hall/add-hall.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'halls', component: HallsComponent },
  { path: 'add-hall', component: AddHallComponent },
];

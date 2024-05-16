import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './sevice/profile.service';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent {
  constructor(private router: Router, private profileService: ProfileService) {
    if (localStorage.getItem('jwt') == null) {
      this.router.navigate(['/login']);
    }
  }
}

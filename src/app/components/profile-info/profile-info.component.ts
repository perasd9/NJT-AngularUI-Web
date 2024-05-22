import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './sevice/profile.service';
import { AuthService } from '../../guards/auth.service';
import { User } from '../../model/User';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit {
  user!: User;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser();
  }

  showPasswordChange = false;

  togglePasswordChange() {
    this.showPasswordChange = !this.showPasswordChange;
  }

  logout() {
    this.authService.setUser(null);
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }
}

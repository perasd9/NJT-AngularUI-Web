import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './sevice/profile.service';
import { AuthService } from '../../guards/auth.service';
import { User } from '../../model/User';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { NotificationService } from '../notifications/service/notification.service';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss',
})
export class ProfileInfoComponent implements OnInit {
  user!: User;
  changePasswordBody: any = { currentPassword: '', newPassword: '' };

  constructor(
    private router: Router,
    private authService: AuthService,
    private profileService: ProfileService,
    private toast: NgToastService,
    private notificationService: NotificationService
  ) {}

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
    this.notificationService.disconnect();
  }
  handleChangePassword() {
    this.profileService
      .changePassword(this.changePasswordBody)
      .subscribe((res) => {
        if (res.status == 200) {
          this.toast.success({
            duration: 1500,
            detail: 'Success',
            summary: 'Vasa lozinka je uspesno promenjena!',
          });
        } else {
          this.toast.error({
            duration: 1500,
            detail: 'Error',
            summary: 'Neuspesna promena lozinke proverite vasa polja!',
          });
        }
      });
  }
}

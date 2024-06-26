import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../model/User';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { AuthService } from '../../guards/auth.service';
import { RegisterComponent } from '../register/register.component';
import { NotificationService } from '../notifications/service/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user: User = new User(0, '', '', '', '', false, false, 'user', 'USER');

  @ViewChild('registerComponent')
  registerComponent!: RegisterComponent;

  constructor(
    private loginService: LoginService,
    private toast: NgToastService,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    if (localStorage.getItem('user') != null) {
      router.navigateByUrl(
        router.lastSuccessfulNavigation?.finalUrl?.toString()!
      );
    }
  }

  ngOnInit(): void {}

  handleLogin() {
    this.loginService.login(this.user).subscribe(
      (res) => {
        if (res.status == 200) {
          localStorage.setItem('jwt', res.body.jwt);
          this.authService.setUser(res.body.user);

          this.notificationService.connect();
          this.router.navigate(['']);

          this.toast.success({
            detail: 'Success',
            summary: 'Uspesno logovanje!',
            duration: 3000,
          });
        }
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Kredencijali nisu ispravni!',
          duration: 1500,
        });
        console.log(err);
      }
    );
  }
  showRegister() {
    this.registerComponent.registrationModal.nativeElement.style.left = '0';
  }
}

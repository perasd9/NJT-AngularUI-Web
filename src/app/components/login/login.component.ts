import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user: User = new User(0, '', '', '', '', false, false);

  constructor(
    private loginService: LoginService,
    private toast: NgToastService,
    private router: Router
  ) {
    if (localStorage.getItem('jwt') != null) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  handleLogin() {
    this.loginService.login(this.user).subscribe(
      (res) => {
        if (res.status == 400) {
          this.toast.error({
            detail: 'Error',
            summary: 'Kredencijali nisu ispravni!',
            duration: 3000,
          });
        } else if (res.status == 200) {
          localStorage.setItem('jwt', res.body.jwt);
          this.router.navigate(['/']);

          this.toast.success({
            detail: 'Success',
            summary: 'Uspesno logovanje!',
            duration: 3000,
          });
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

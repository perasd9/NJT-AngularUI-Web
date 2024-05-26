import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../../model/User';
import { FormsModule } from '@angular/forms';
import { RegisterService } from './service/register.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @ViewChild('registrationModal')
  registrationModal!: ElementRef;

  user: User = new User(0, '', '', '', '', false, false, 'user');

  constructor(
    private registerService: RegisterService,
    private toast: NgToastService
  ) {}

  handleCloseAddReservationModal() {
    this.registrationModal.nativeElement.style.left = '-300%';
  }
  handleRegister() {
    this.registerService.register(this.user).subscribe((res) => {
      if (res.status == 201) {
        this.handleCloseAddReservationModal();
        this.toast.success({
          detail: 'Success',
          summary:
            'Uspesno ste se registrovali, email za potvrdu registracije je poslat na Vas mail!',
          duration: 1500,
        });
      } else {
        this.toast.error({
          detail: 'error',
          duration: 1500,
          summary: 'Podaci za registraciju nisu ispravni!',
        });
      }
    });
  }
}

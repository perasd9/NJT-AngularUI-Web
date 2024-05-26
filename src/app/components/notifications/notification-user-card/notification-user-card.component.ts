import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../model/User';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../service/notification.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-notification-user-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './notification-user-card.component.html',
  styleUrl: '../notification-card/notification-card.component.scss',
})
export class NotificationUserCardComponent implements OnInit {
  @Input({ required: true })
  userNotification!: User;
  @Output()
  notificationEmitter: EventEmitter<any> = new EventEmitter();

  constructor(
    private notificationService: NotificationService,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.userNotification.role = 'USER';
  }

  handleAcceptRegistration() {
    this.notificationService
      .acceptUser(this.userNotification)
      .subscribe((res) => {
        if (res.status == 200) {
          this.notificationEmitter.emit();

          this.toast.success({
            duration: 1500,
            detail: 'Success',
            summary: 'Korisnik je uspesno procesiran!',
          });
        } else {
          this.toast.error({
            duration: 1500,
            detail: 'Error',
            summary: 'Korisnik ne moze biti procesuiran!',
          });
        }
      });
  }
  handleDenyRegistration() {
    this.notificationService
      .denyUser(this.userNotification)
      .subscribe((res) => {
        if (res.status == 200) {
          this.notificationEmitter.emit();

          this.toast.success({
            duration: 1500,
            detail: 'Success',
            summary: 'Korisnik je odbijen!',
          });
        } else {
          this.toast.error({
            duration: 1500,
            detail: 'Error',
            summary: 'Korisnik ne moze biti odbijen!',
          });
        }
      });
  }
}

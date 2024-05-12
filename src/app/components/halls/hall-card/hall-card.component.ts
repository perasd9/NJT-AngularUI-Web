import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hall } from '../../../model/Hall';
import { HallStatus } from '../../../model/HallStatus';
import { HallType } from '../../../model/HallType';
import { Router } from '@angular/router';
import { HallService } from '../services/hall.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-hall-card',
  standalone: true,
  imports: [],
  templateUrl: './hall-card.component.html',
  styleUrl: './hall-card.component.scss',
})
export class HallCardComponent {
  @Input({ required: true })
  hall!: Hall;

  @Output()
  hallDeleted: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private router: Router,
    private hallService: HallService,
    private toast: NgToastService
  ) {}

  navigateToAddHall() {
    this.router.navigate(['/add-hall'], {
      state: { isFormUpdate: true, hall: this.hall },
    });
  }
  deleteHall() {
    this.hallService.deleteHall(this.hall.id).subscribe(
      (res) => {
        if (res.status == 200) {
          this.hallDeleted.emit('hallDeleted');

          this.toast.success({
            detail: 'Success',
            summary: 'Sala je uspesno obrisana!',
            duration: 3000,
          });
        }
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Sala ne moze biti obrisana!' + err,
          duration: 3000,
        });
      }
    );
  }
}

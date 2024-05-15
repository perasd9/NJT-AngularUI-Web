import {
  AfterViewInit,
  Component,
  DoCheck,
  Input,
  OnInit,
} from '@angular/core';
import { Hall } from '../../../model/Hall';
import { FormsModule } from '@angular/forms';
import { HallType } from '../../../model/HallType';
import { HallStatus } from '../../../model/HallStatus';
import { HallService } from '../services/hall.service';
import { CommonModule, LocationStrategy } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-hall',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-hall.component.html',
  styleUrl: './add-hall.component.scss',
})
export class AddHallComponent implements OnInit {
  hallTypes: HallType[] = [];
  hallStatuses: HallStatus[] = [];

  @Input({ required: true })
  isFormUpdate: boolean = false;

  @Input({ required: false })
  hall: Hall = new Hall(
    0,
    '',
    0,
    '',
    0,
    0,
    this.hallStatuses[0],
    0,
    this.hallTypes[0]
  );

  constructor(
    private hallService: HallService,
    private loction: LocationStrategy,
    private toast: NgToastService,
    private router: Router
  ) {
    if (localStorage.getItem('jwt') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    const state = this.loction.getState() as {
      isFormUpdate: boolean;
      hall?: Hall;
    };
    this.hallService.getHallStatuses().subscribe((res) => {
      this.hallStatuses = res.body;

      state.hall == undefined
        ? (this.hall.statusSale = this.hallStatuses[0])
        : (this.hall.statusSale = this.hallStatuses.find(
            (stat) => stat.id === state.hall!.statusSale?.id
          ));
    });

    this.hallService.getHallTypes().subscribe((res) => {
      this.hallTypes = res.body;

      state.hall == undefined
        ? (this.hall.tipSale = this.hallTypes[0])
        : (this.hall.tipSale = this.hallTypes.find(
            (type) => type.id === state.hall!.tipSale?.id
          ));
    });

    this.isFormUpdate = state.isFormUpdate;
    if (state.hall != undefined) this.hall = state.hall!;
  }

  handleAddHall() {
    this.hallService.addHall(this.hall).subscribe(
      (res) => {
        if (res.status == 200) {
          this.router.navigate(['/halls']);

          this.toast.success({
            detail: 'Success',
            summary: 'Sala je uspesno kreirana!',
            duration: 3000,
          });
        }
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Sala ne moze biti dodata!' + err,
          duration: 3000,
        });
      }
    );
  }
  handleUpdateHall() {
    this.hallService.updateHall(this.hall).subscribe(
      (res) => {
        if (res.status == 200) {
          this.router.navigate(['/halls']);

          this.toast.success({
            detail: 'Success',
            summary: 'Sala je uspesno izmenjena!',
            duration: 3000,
          });
        }
      },
      (err) => {
        this.toast.error({
          detail: 'Error',
          summary: 'Sala ne moze biti izmenjena!' + err,
          duration: 3000,
        });
      }
    );
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { AddHallComponent } from './add-hall/add-hall.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HallCardComponent } from './hall-card/hall-card.component';
import { Hall } from '../../model/Hall';
import { HallType } from '../../model/HallType';
import { HallStatus } from '../../model/HallStatus';
import { CommonModule, NgFor } from '@angular/common';
import { HallService } from './services/hall.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-halls',
  standalone: true,
  imports: [
    AddHallComponent,
    RouterLink,
    RouterLinkActive,
    HallCardComponent,
    NgFor,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './halls.component.html',
  styleUrl: './halls.component.scss',
})
export class HallsComponent implements OnInit {
  halls: Hall[] = [];
  searchName: string = '';

  constructor(private hallService: HallService, private router: Router) {
    if (localStorage.getItem('jwt') == null) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.hallService.getHalls().subscribe(
      (res) => {
        this.halls = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  navigateToAddHall() {
    this.router.navigate(['/add-hall'], { state: { isFormUpdate: false } });
  }

  onHallUpdated(event: any) {
    if (event === 'hallDeleted') {
      this.ngOnInit();
    }
  }

  handleSearchHalls() {
    this.hallService.getHallsByName(this.searchName).subscribe(
      (res) => {
        this.halls = res.body;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}

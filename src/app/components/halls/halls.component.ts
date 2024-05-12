import { Component, Inject, OnInit } from '@angular/core';
import { AddHallComponent } from './add-hall/add-hall.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HallCardComponent } from './hall-card/hall-card.component';
import { Hall } from '../../model/Hall';
import { HallType } from '../../model/HallType';
import { HallStatus } from '../../model/HallStatus';
import { NgFor } from '@angular/common';
import { HallService } from './services/hall.service';

@Component({
  selector: 'app-halls',
  standalone: true,
  imports: [
    AddHallComponent,
    RouterLink,
    RouterLinkActive,
    HallCardComponent,
    NgFor,
  ],
  templateUrl: './halls.component.html',
  styleUrl: './halls.component.scss',
})
export class HallsComponent implements OnInit {
  halls: Hall[] = [];

  constructor(private hallService: HallService, private router: Router) {}

  ngOnInit(): void {
    this.hallService.getHalls().subscribe((res) => {
      this.halls = res.body;
    });
  }

  navigateToAddHall() {
    this.router.navigate(['/add-hall'], { state: { isFormUpdate: false } });
  }

  onHallUpdated(event: any) {
    if (event === 'hallDeleted') {
      this.ngOnInit();
    }
  }
}

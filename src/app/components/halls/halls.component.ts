import { Component } from '@angular/core';
import { AddHallComponent } from './add-hall/add-hall.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HallCardComponent } from './hall-card/hall-card.component';
import { Hall } from '../../model/Hall';
import { HallType } from '../../model/HallType';
import { HallStatus } from '../../model/HallStatus';
import { NgFor } from '@angular/common';

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
export class HallsComponent {
  halls: Hall[] = [
    new Hall(
      1,
      'Amfiteatar 5',
      4,
      'napomena',
      4,
      undefined,
      new HallStatus(1, 'Aktivna'),
      undefined,
      new HallType(1, 'Racunarski centar')
    ),
  ];
}

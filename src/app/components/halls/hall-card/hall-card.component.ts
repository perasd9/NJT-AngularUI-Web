import { Component, Input } from '@angular/core';
import { Hall } from '../../../model/Hall';
import { HallStatus } from '../../../model/HallStatus';
import { HallType } from '../../../model/HallType';

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
}

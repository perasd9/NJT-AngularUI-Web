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
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-hall',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-hall.component.html',
  styleUrl: './add-hall.component.scss',
})
export class AddHallComponent implements OnInit {
  @Input({ required: true })
  isFormUpdate: boolean = true;

  @Input({ required: false })
  hall: Hall = new Hall(0, '', 0, '', 0, 0, undefined, 0, undefined);

  hallTypes: HallType[] = [];
  hallStatuses: HallStatus[] = [];
  selectedHallTypeOption: HallType = new HallType(0, '');
  selectedHallStatusOption: HallStatus = new HallStatus(0, '');

  constructor(
    private hallService: HallService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.isFormUpdate = JSON.parse(params.get('isFormUpdate')!);
      console.log(params);
    });
    if (this.hall.salaId == 0) {
      this.hallService.getHallStatuses().subscribe((res) => {
        this.hallStatuses = res;
        this.selectedHallStatusOption =
          this.hallStatuses[this.hallStatuses.length - 1];
        this.hall.statusSale = this.hallStatuses[this.hallStatuses.length - 1];
      });
      this.hallService.getHallTypes().subscribe((res) => {
        this.hallTypes = res;
        this.selectedHallTypeOption = this.hallTypes[this.hallTypes.length - 1];
        this.hall.tipSale = this.hallTypes[this.hallTypes.length - 1];
      });
    } else {
    }
  }

  handleAddHall() {
    console.log(this.hall);
  }
  handleUpdateHall() {}
}

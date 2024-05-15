import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-topbar-calendar',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './topbar-calendar.component.html',
  styleUrl: './topbar-calendar.component.scss',
})
export class TopbarCalendarComponent implements OnInit {
  firstDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    1
  );
  lastDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  @ViewChild('datesContainer') datesContainer!: ElementRef;

  dates: Date[] = [];

  @Output()
  selectedDateChanging: EventEmitter<Date> = new EventEmitter<Date>();

  selectedDate: number = 0;

  ngOnInit(): void {
    for (let i = 1; i <= this.lastDate.getDate(); i++) {
      this.dates.push(
        new Date(new Date().getFullYear(), new Date().getMonth(), i)
      );
    }
  }

  scrollRight(): void {
    this.datesContainer.nativeElement.scrollTo({
      left: this.datesContainer.nativeElement.scrollLeft + 400,
      behavior: 'smooth',
    });
  }

  scrollLeft(): void {
    this.datesContainer.nativeElement.scrollTo({
      left: this.datesContainer.nativeElement.scrollLeft - 400,
      behavior: 'smooth',
    });
  }

  handleSelectDate(i: number) {
    this.selectedDate = i;
    this.selectedDateChanging.emit(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        this.selectedDate + 1
      )
    );
  }
}

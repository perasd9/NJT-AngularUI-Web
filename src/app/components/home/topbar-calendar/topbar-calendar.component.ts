import { CommonModule, NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-topbar-calendar',
  standalone: true,
  imports: [NgFor, CommonModule, FormsModule],
  templateUrl: './topbar-calendar.component.html',
  styleUrl: './topbar-calendar.component.scss',
})
export class TopbarCalendarComponent implements OnInit {
  firstDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  lastDate: Date = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  selectedDateInput: string = this.formatDate(this.firstDate);
  chooseDateString: string = this.formatDate(this.firstDate);

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
    const newDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      this.selectedDate + 1
    );
    this.selectedDateInput = this.formatDate(newDate);
    this.chooseDateString = this.selectedDateInput;

    this.selectedDateChanging.emit(newDate);
  }

  onChangeDate(event: any) {
    const selectedDate = event.srcElement.valueAsDate;
    this.selectedDateInput = this.formatDate(selectedDate);
    this.selectedDateChanging.emit(selectedDate);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
}

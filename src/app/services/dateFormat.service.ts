import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateFormatService {
  constructor() {}

  formatDate(inputDate: string) { // August 11
    const date = new Date(inputDate);
    return date.toLocaleString('en-US', { month: 'long', day: 'numeric' });
  }
}

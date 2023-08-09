import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CalculationService {
  constructor() {}

  calculateMissingNewsCount(num: number) {
    //calculates how many items do we need to make array 20 news
    if (num >= 20 && num % 20 === 0) {
      return 0; // Already a multiple of 20, no need to increase.
    } else {
      return 20 - (num % 20);
    }
  }
}

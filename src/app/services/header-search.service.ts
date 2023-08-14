import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderSearchService {
  headerSearchValue: string = '';
  headerSearchValueChange: Subject<string> = new Subject<string>();

  constructor() {
    this.headerSearchValueChange.subscribe((value) => {
      this.headerSearchValue = value;
    });
  }

  changeValue(value: string) {
    this.headerSearchValueChange.next(value);
  }

  getValue() {
    return this.headerSearchValue;
  }
}

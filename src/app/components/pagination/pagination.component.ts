import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
  @Input() newsCount: number;
  eachPageCount: number = 20;
  pageCount: number;
  pageNumbers: number[] = [];
  currentPage: number = 1;
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    // Check if the 'newsCount' input property has changed and pushes numbers to array
    if (
      changes['newsCount'] &&
      changes['newsCount'].currentValue != undefined
    ) {
      console.log('newsCount has changed:', changes['newsCount'].currentValue);
      this.pageCount = Math.ceil(this.newsCount / this.eachPageCount); //calculating page count

      for (let i = 0; i < this.pageCount; i++) {
        this.pageNumbers.push(i);
      }
    }
    if (changes['currentPage']) {
      console.log(changes['currentPage']);
    }
  }
  changePage(pageNum: number) {
    this.currentPage = pageNum;
    this.sendPageNumToParent();
  }
  prevPage() {
    if (!(this.currentPage <= 1)) {
      this.currentPage = this.currentPage - 1;
    }
    this.sendPageNumToParent();
  }
  nextPage() {
    if (
      !(this.currentPage >= this.pageNumbers[this.pageNumbers.length - 1] + 1)
    ) {
      this.currentPage = this.currentPage + 1;
    }
    this.sendPageNumToParent();
  }

  sendPageNumToParent() {
    this.parentFunction.emit(this.currentPage);
  }
}

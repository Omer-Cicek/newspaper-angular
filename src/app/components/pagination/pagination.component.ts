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
  // currentPage: number = 1;
  @Output() parentFunction: EventEmitter<any> = new EventEmitter();
  @Input() currentPageNumber: number;

  ngOnInit() {
    console.log('initialized');
    // console.log(this.currentPage);
    console.log(this.currentPageNumber, 'currentPageNumber');
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check if the 'newsCount' input property has changed and pushes numbers to array
    if (
      changes['newsCount'] &&
      changes['newsCount'].currentValue != undefined
    ) {
      this.pageCount = Math.ceil(this.newsCount / this.eachPageCount); //calculating page count

      for (let i = 0; i < this.pageCount; i++) {
        this.pageNumbers.push(i);
      }
    }
    // if (changes['currentPage']) {
    //   console.log(changes['currentPage'], 'currennttt');
    // }
    // console.log(changes['currentPage'], 'rrerer');
  }

  changePage(pageNum: number) {
    if (this.currentPageNumber == pageNum) return;
    this.currentPageNumber = pageNum;
    console.log(this.currentPageNumber);
    this.sendPageNumToParent(pageNum);
  }

  prevPage() {
    if (!(this.currentPageNumber <= 1)) {
      this.currentPageNumber = this.currentPageNumber - 1;
    }
    this.sendPageNumToParent(this.currentPageNumber - 1);
  }

  nextPage() {
    if (
      !(
        this.currentPageNumber >=
        this.pageNumbers[this.pageNumbers.length - 1] + 1
      )
    ) {
      this.currentPageNumber = this.currentPageNumber + 1;
    }
    // console.log(this.currentPageNumber, 'this.currentPage');
    this.sendPageNumToParent(this.currentPageNumber + 1);
  }

  sendPageNumToParent(pageNum: number) {
    this.parentFunction.emit(pageNum);
  }
}

import { Component, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { GetData } from 'src/app/services/getData.service';
import { newsData } from 'src/app/shared/newsData.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  news: newsData[] = [];
  constructor(private getData: GetData) {}
  newsCount: number;
  currentPageNum: number = 1;
  slides: [] = [];

  getNews() {
    this.getData
      .getNewsWithoutQuery()
      .then((response) => {
        console.log(response, 'resppp');
        this.newsCount = response.data.totalResults;
        this.news = response.data.articles.slice(3);
        this.calculateMissingNewsCount(response.data.totalResults);
        const ömer = response.data.articles.slice(
          -this.calculateMissingNewsCount(response.data.totalResults)
        );
        console.log(ömer);
        this.slides = response.data.articles.slice(0, 3).map((el: newsData) => {
          return {
            ...el,
            ifNoImg: 'src/assets/noImage.jpg',
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['newItemEvent']);
  }

  ngOnInit() {
    this.getNews();
  }

  pageChanged(pageNumber: any) {
    if (pageNumber == this.currentPageNum) return;
    this.currentPageNum = pageNumber;
    this.getData.getNewsWithPageNum(pageNumber).then((news) => {
      console.log(news);
    });
  }

  calculateMissingNewsCount(num: number) {
    //calculates how many items do we need to make array 20 news
    if (num >= 20 && num % 20 === 0) {
      return 0; // Already a multiple of 20, no need to increase.
    } else {
      return 20 - (num % 20);
    }
  }
}

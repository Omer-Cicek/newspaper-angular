import { Component } from '@angular/core';
import { GetData } from 'src/app/services/getData.service';
import { newsData } from 'src/app/shared/newsData.interface';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css'],
})
export class GeneralComponent {
  news: newsData[] = []; //keeps news to display
  newsCount: number; //Gives total count of news(34)
  currentPageNum: number | null = null; //holds current page number
  slides: [] = []; //Holds news that will be shown at slider compoenent(first three news)
  missingNews: newsData[] = [];

  constructor(private getData: GetData) {}

  pageChanged(pageNumber: number) {
    if (pageNumber == this.currentPageNum) return;
    this.currentPageNum = pageNumber;
    this.getData.getNewsWithCategoryName('general', pageNumber).then((news) => {
      this.newsCount = news.data.totalResults;
      console.log(news, 'news', news.data.articles.length);
      this.news = news.data.articles.slice(3); //gets news from newsapi
      this.calculateMissingNewsCount(news.data.totalResults);
      this.missingNews = news.data.articles //gets the news that make "news array" 20
        .slice(-this.calculateMissingNewsCount(news.data.totalResults));
      if (pageNumber == 1) this.news = news.data.articles.slice(3);
      // gets all 20 news except first 3 if pageNumber is 1
      else if (news.data.articles.length < 17)
        this.news = [...this.missingNews, ...news.data.articles];
    });
  }

  calculateMissingNewsCount(num: number) {
    // const num2 = num - 3;
    //calculates how many items do we need to make array 20 news
    if (num >= 20 && num % 20 === 0) {
      return 0; // Already a multiple of 20, no need to increase.
    } else {
      return 20 - (num % 20);
    }
  }

  ngOnInit() {
    this.pageChanged(1);
  }
}

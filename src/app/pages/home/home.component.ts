import { Component, SimpleChanges } from '@angular/core';
import { GetData } from 'src/app/services/getData.service';
import { newsData } from 'src/app/shared/newsData.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  news: newsData[] = []; //keeps news to display
  constructor(private getData: GetData) {}
  newsCount: number; //Gives total count of news(34)
  currentPageNum: number = 1; //holds current page number
  slides: [] = []; //Holds news that will be shown at slider compoenent(first three news)
  missingNews: newsData[] = [];
  isLoading: boolean = false;
  showError: boolean = false;

  getNews() {
    this.showError = false;
    this.isLoading = true;
    this.getData
      .getNewsWithCategoryName(this.currentPageNum, '')
      .then((response) => {
        console.log(response, 'resppp');
        this.newsCount = response.data.totalResults;
        this.news = response.data.articles.slice(3); //gets news from newsapi
        this.calculateMissingNewsCount(response.data.totalResults);
        if (this.missingNews.length == 0) {
          this.missingNews = response.data.articles //sets the news to make newsArray's count 20
            .slice(-this.calculateMissingNewsCount(response.data.totalResults));
        }
        console.log(this.missingNews, 'asdasd');
        this.slides = response.data.articles.slice(0, 3).map((el: newsData) => {
          return {
            ...el,
            ifNoImg: 'src/assets/noImage.jpg', //sets the default image path if there is no image 
          };
        });
      })
      .catch((error) => {
        this.showError = true;
        console.log(error);
      })
      .finally(() => (this.isLoading = false));
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
    this.getData.getNewsWithCategoryName(pageNumber, '').then((news) => {
      console.log(news, 'news', news.data.articles.length);
      if (pageNumber == 1) this.news = news.data.articles.slice(3);
      // gets all 20 news except first 3 if pageNumber is 1
      else if (news.data.articles.length < 17)
        this.news = [...this.missingNews, ...news.data.articles];
    });
  }

  calculateMissingNewsCount(num: number) {
    const num2 = num - 3;
    //calculates how many items do we need to make array 20 news
    if (num2 >= 17 && num2 % 17 === 0) {
      return 0; // Already a multiple of 20, no need to increase.
    } else {
      return 17 - (num2 % 17);
    }
  }
}

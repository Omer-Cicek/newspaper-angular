import { Component } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';
import { GetData } from 'src/app/services/getData.service';
import { newsData } from 'src/app/shared/newsData.interface';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css'],
})
export class TechnologyComponent {
  news: newsData[] = []; //keeps news to display
  newsCount: number; //Gives total count of news(34)
  currentPageNum: number | null = null; //holds current page number
  slides: [] = []; //Holds news that will be shown at slider compoenent(first three news)
  missingNews: newsData[] = [];
  isLoading: boolean = false;

  constructor(
    private getData: GetData,
    private calculationService: CalculationService
  ) {}

  pageChanged(pageNumber: number) {
    if (pageNumber == this.currentPageNum) return;
    this.isLoading = true;
    this.currentPageNum = pageNumber;
    this.getData
      .getNewsWithCategoryName('technology', pageNumber)
      .then((news) => {
        this.newsCount = news.data.totalResults;
        this.news = news.data.articles; //gets news from newsapi
        this.calculationService.calculateMissingNewsCount(
          news.data.totalResults
        );
        if (this.missingNews.length == 0) {
          this.missingNews = news.data.articles //gets the news that make "news array" 20
            .slice(
              -this.calculationService.calculateMissingNewsCount(
                news.data.totalResults
              )
            );
        }
        // gets all 20 news except first 3 if pageNumber is 1
        if (news.data.articles.length < 20)
          this.news = [...this.missingNews, ...news.data.articles];
      })
      .catch((err) => console.log(err))
      .finally(() => (this.isLoading = false));
  }

  calculateMissingNewsCount(num: number) {
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

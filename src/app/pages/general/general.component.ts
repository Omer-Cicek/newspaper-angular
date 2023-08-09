import { Component } from '@angular/core';
import { GetData } from 'src/app/services/getData.service';
import { CalculationService } from 'src/app/services/calculation.service';
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
      .getNewsWithCategoryName('general', pageNumber)
      .then((news) => {
        this.newsCount = news.data.totalResults;
        console.log(news, 'news', news.data.articles.length);
        this.news = news.data.articles; //sets news from newsapi
        this.calculationService.calculateMissingNewsCount(
          news.data.totalResults
        );
        if (this.missingNews.length == 0) {
          this.missingNews = news.data.articles //sets the news that make "news array" 20
            .slice(
              -this.calculationService.calculateMissingNewsCount(
                news.data.totalResults
              )
            );
        }
        if (news.data.articles.length < 20)
          this.news = [...this.missingNews, ...news.data.articles];
      })
      .catch((err) => console.log(err))
      .finally(() => (this.isLoading = false));
  }

  ngOnInit() {
    this.pageChanged(1);
  }
}

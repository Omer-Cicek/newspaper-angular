import { Component, SimpleChanges } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';
import { GetData } from 'src/app/services/getData.service';
import { newsData } from 'src/app/shared/newsData.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  news: newsData[] = []; //keeps news to display
  constructor(
    private getData: GetData,
    private calculationService: CalculationService
  ) {}
  newsCount: number; //Gives total count of news(34)
  currentPageNum: number = 1; //holds current page number
  slides: [] = []; //Holds news that will be shown at slider compoenent(first three news)
  missingNews: newsData[] = [];
  isLoading: boolean = false;
  showError: boolean = false;

  getNews(pageNumber: number) {
    this.showError = false;
    this.isLoading = true;
    console.log('çalıltı');
    this.getData
      .getNewsWithCategoryName(this.currentPageNum, '')
      .then((response) => {
        this.newsCount = response.data.totalResults;
        this.news = response.data.articles.slice(3); //gets news from newsapi
        this.calculationService.calculateMissingNewsCount(
          response.data.totalResults
        );
        if (this.missingNews.length == 0) {
          this.missingNews = response.data.articles //sets the news to make newsArray's count 20
            .slice(
              -this.calculationService.calculateMissingNewsCount(
                response.data.totalResults
              )
            );
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

  ngOnInit() {
    this.getNews(1);
  }

  pageChanged(pageNumber: any) {
    if (pageNumber == this.currentPageNum) return;
    console.log(pageNumber, 'homePageNumm');
    this.currentPageNum = pageNumber;
    this.getNews(pageNumber);
  }
}

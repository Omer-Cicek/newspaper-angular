import { Component, SimpleChanges } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';
import { GetData } from 'src/app/services/getData.service';
import { HeaderSearchService } from 'src/app/services/header-search.service';
import { newsData } from 'src/app/shared/newsData.interface';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  news: newsData[] = []; //keeps news to display
  headerSearchValue: string = '';
  constructor(
    private getData: GetData,
    private calculationService: CalculationService,
    private headerSearchService: HeaderSearchService
  ) {
    this.headerSearchValue = headerSearchService.getValue();
  }
  newsCount: number; //Gives total count of news(34)
  currentPageNum: number = 1; //holds current page number
  slides: [] = []; //Holds news that will be shown at slider compoenent(first three news)
  missingNews: newsData[] = [];
  isLoading: boolean = false;
  showError: boolean = false;
  currentCategory: string = window.location.pathname; //using current path to request
  myId = uuid();
  rawData: newsData[] = [];
  filteredNews: newsData[] = [];

  getNews(pageNumber: number) {
    this.showError = false;
    this.isLoading = true;
    this.getData
      .getNewsWithCategoryName(this.currentPageNum, '')
      .then((response) => {
        this.newsCount = response.data.totalResults;
        this.rawData = response.data.articles;
        this.news = response.data.articles.slice(3).map((neww: newsData) => {
          return {
            ...neww,
            id: this.myId,
            currentCategory: this.currentCategory,
            sourceName: neww.source.name,
          };
        }); //gets news from newsapi
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
        this.slides = response.data.articles.slice(0, 3).map((el: newsData) => {
          return {
            ...el,
            id: this.myId,
            ifNoImg: 'src/assets/noImage.jpg', //sets the default image path if there is no image
            currentCategory: this.currentCategory,
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
    this.getNews(1); // request for first pages value when initialized
    this.headerSearchService.headerSearchValueChange.subscribe(
      //filters data based on header filter value
      (changedValue) => {
        this.filteredNews = this.rawData.filter((el) =>
          el.title.toLowerCase().toLowerCase().includes(changedValue)
        );
        if (changedValue == '') this.filteredNews = []; // make filteredData array empty when filter is removed
      }
    );
  }

  pageChanged(pageNumber: any) {
    if (pageNumber == this.currentPageNum) return;
    console.log(pageNumber, 'homePageNumm');
    this.currentPageNum = pageNumber;
    this.getNews(pageNumber);
    console.log(this.headerSearchValue, 'headerSeaerchvalue');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.headerSearchService.getValue());
    console.log(changes['headerSearchValue']);
  }

  ngOnDestroy() {
    this.headerSearchService.headerSearchValueChange.unsubscribe();
  }
}

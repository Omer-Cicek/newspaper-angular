import { Component } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { CalculationService } from 'src/app/services/calculation.service';
import { GetData } from 'src/app/services/getData.service';
import { newsData } from 'src/app/shared/newsData.interface';
import { HeaderSearchService } from 'src/app/services/header-search.service';

@Component({
  selector: 'app-each-categories',
  templateUrl: './each-categories.component.html',
  styleUrls: ['./each-categories.component.css'],
})
export class EachCategoriesComponent {
  news: newsData[] = []; //keeps news to display
  newsCount: number; //Gives total count of news(34)
  currentPageNum: number | null = null; //holds current page number
  slides: [] = []; //Holds news that will be shown at slider compoenent(first three news)
  missingNews: newsData[] = []; //it calculates missing news and holds for last page's news count to make it 20
  isLoading: boolean = false; //to show or hide spinner
  currentCategory: string = window.location.pathname; //using current path to request
  myId = uuid();
  rawData: newsData[] = [];
  filteredNews: newsData[] = [];
  showError: boolean = false;

  constructor(
    private getData: GetData,
    private calculationService: CalculationService,
    private headerSearchService: HeaderSearchService
  ) {}

  pageChanged(pageNumber: number) {
    if (pageNumber == this.currentPageNum) return;
    this.isLoading = true;
    this.currentPageNum = pageNumber;
    this.getData
      .getNewsWithCategoryName(pageNumber, this.currentCategory.slice(1))
      .then((news) => {
        this.newsCount = news.data.totalResults;
        this.rawData = this.news = news.data.articles.map((neww: newsData) => {
          return {
            ...neww,
            id: this.myId,
            currentCategory: this.currentCategory,
            sourceName: neww.source.name,
          };
        }); //gets news from newsapi
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
      .catch((err) => (this.showError = true))
      .finally(() => (this.isLoading = false));
  }

  ngOnInit() {
    this.pageChanged(1);
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
}

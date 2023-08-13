import { Component, ViewChild, ElementRef } from '@angular/core';
import { CalculationService } from 'src/app/services/calculation.service';
import { GetData } from 'src/app/services/getData.service';
import { HeaderSearchService } from 'src/app/services/header-search.service';
import { newsData } from 'src/app/shared/newsData.interface';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  categories = [
    { name: 'Business', isChecked: false, path: 'business' },
    { name: 'Entertainment', isChecked: false, path: 'entertainment' },
    { name: 'General', isChecked: false, path: 'general' },
    { name: 'Health', isChecked: false, path: 'health' },
    { name: 'Sports', isChecked: false, path: 'sports' },
    { name: 'Science', isChecked: false, path: 'science' },
    { name: 'Technology', isChecked: false, path: 'technology' },
  ];
  news: newsData[] = []; //keeps news to display
  newsCount: number; //Gives total count of news(34)
  currentPageNum: number | null = null; //holds current page number
  slides: [] = []; //Holds news that will be shown at slider compoenent(first three news)
  missingNews: newsData[] = []; //it calculates missing news and holds for last page's news count to make it 20
  isLoading: boolean = false; //to show or hide spinner
  showError: boolean = false; // to show error message if error exists
  currentCategory: string = window.location.pathname; //using current path to request
  rawData: newsData[] = [];
  filteredNews: newsData[] = [];

  constructor(
    private getData: GetData,
    private calculationService: CalculationService,
    private headerSearchService: HeaderSearchService
  ) {}

  @ViewChild('myCheckbox', { static: false }) elRef: ElementRef;
  selectedCategory: string = '';
  public isChecked = false;
  myId = uuid();

  ngOnInit() {
    this.selectedCategory = this.categories[0].path;
    this.pageChanged(1);
    this.headerSearchService.headerSearchValueChange.subscribe(
      //filters data based on header filter value
      (changedValue) => {
        console.log(changedValue, 'changedValue44');
        this.filteredNews = this.rawData.filter((el) =>
          el.title.toLowerCase().toLowerCase().includes(changedValue)
        );
        if (changedValue == '') this.filteredNews = []; // make filteredData array empty when filter is removed
      }
    );
  }

  getSelectedCheckbox(selected: string) {
    if (this.selectedCategory == selected) {
      this.elRef.nativeElement.isChecked = true;
      this.elRef.nativeElement.value = selected;
      return;
    }
    this.selectedCategory = selected;
    this.pageChanged(1);
  }
  checkboxClick(event: any) {
    event.target.checked = true;
  }

  pageChanged(pageNumber: number) {
    this.isLoading = true;
    this.currentPageNum = pageNumber;
    this.getData
      .getNewsWithCategoryName(pageNumber, this.selectedCategory)
      .then((news) => {
        this.newsCount = news.data.totalResults;
        console.log(news, 'news', news.data.articles.length);
        this.rawData = this.news = news.data.articles.map((neww: newsData) => {
          return {
            ...neww,
            id: this.myId,
            currentCategory: this.currentCategory,
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
        // concats these 2 arrays if last page news count is less than 20
        if (news.data.articles.length < 20)
          this.news = [...this.missingNews, ...news.data.articles];
      })
      .catch((err) => (this.showError = true))
      .finally(() => (this.isLoading = false));
  }
}

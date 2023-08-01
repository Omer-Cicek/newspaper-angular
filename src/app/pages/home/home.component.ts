import { Component } from '@angular/core';
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

  //   slides = [
  //     // { url: '../../../assets/hamburgerMenu.png', title: 'beach' },
  //     // { url: '../../../assets/noImage.jpg', title: 'boat' },
  //     // { url: '../../../assets/noImage.jpg', title: 'forest' },
  //     ...this.news,
  //   ];
  slides: [] = [];
  getNews() {
    this.getData
      .getNewsWithoutQuery()
      .then((response) => {
        console.log(response, 'resppp');
        this.news = response.data.articles;
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

  ngOnInit() {
    this.getNews();
  }
}

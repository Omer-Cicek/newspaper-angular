import { Component } from '@angular/core';
import { GetData } from 'src/app/services/getData.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  news: [] = [];
  constructor(private getData: GetData) {}

  slides = [
    { url: 'asd', title: 'beach' },
    { url: 'asd', title: 'boat' },
    { url: 'asd', title: 'forest' },
    { url: 'asd', title: 'city' },
    { url: 'asd', title: 'italy' },
  ];
  getNews() {
    this.getData
      .getNewsWithoutQuery()
      .then((response) => {
        console.log(response, 'resppp');
        this.news = response.data.articles;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.getNews();
  }
}

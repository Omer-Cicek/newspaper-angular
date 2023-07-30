import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent {
  @Input() newsData: {
    url: string;
    title: string;
    source: {
      id: string;
      name: string;
    };
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    urlToImage: string | null;
  };
}

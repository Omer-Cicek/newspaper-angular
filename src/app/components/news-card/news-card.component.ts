import { Component, Input } from '@angular/core';
import { newsData } from '../../shared/newsData.interface';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent {
  @Input() newsData: newsData;
}

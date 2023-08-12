import { Component, Input } from '@angular/core';
import { newsData } from '../../shared/newsData.interface';
import { DateFormatService } from 'src/app/services/dateFormat.service';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent {
  @Input() newsData: newsData;
  formattedDate: string;

  constructor(private dateFormat: DateFormatService) {}

  ngOnInit() {
    this.formattedDate = this.dateFormat.formatDate(this.newsData.publishedAt);
  }

  navigateToDetails() {
    console.log('clicked', this.newsData);
  }
}

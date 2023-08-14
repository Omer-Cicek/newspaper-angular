import { Component, Input } from '@angular/core';
import { newsData } from '../../shared/newsData.interface';
import { DateFormatService } from 'src/app/services/dateFormat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent {
  @Input() newsData: newsData;
  formattedDate: string;

  constructor(private dateFormat: DateFormatService, private router: Router) {}

  ngOnInit() {
    this.formattedDate = this.dateFormat.formatDate(this.newsData.publishedAt);
  }

  navigateToDetails(newsData: newsData) {
    let url: string = '/newsDetail/' + newsData.id;
    // this.router.navigateByUrl(url, { state: { hello: 'world' } });
    // this.router.navigate([url], { queryParams: 'this.route' });
    this.router.navigate([url], { queryParams: newsData });
  }
}

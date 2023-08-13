import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DateFormatService } from 'src/app/services/dateFormat.service';
import { newsData } from 'src/app/shared/newsData.interface';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css'],
})
export class NewsDetailComponent implements OnInit {
  constructor(
    public activatedRoute: ActivatedRoute,
    private dateFormat: DateFormatService
  ) {}

  detailData: newsData = {
    url: '',
    title: '',
    source: {
      id: '',
      name: '',
    },
    author: '',
    content: '',
    description: '',
    publishedAt: '',
    urlToImage: '',
    ifNoImg: '',
    id: '',
    currentCategory: '',
    sourceName: '',
  };

  formattedDate: string = '';

  ngOnInit() {
    this.activatedRoute.queryParams
      .pipe(
        map((params) => {
          return {
            url: params['url'] || '',
            title: params['title'] || '',
            source: {
              id: params['sourceId'] || '',
              name: params['sourceName'] || '',
            },
            author: params['author'] || '',
            content: params['content'] || '',
            description: params['description'] || '',
            publishedAt: params['publishedAt'] || '',
            urlToImage: params['urlToImage'] || '',
            ifNoImg: params['ifNoImg'] || '',
            id: params['id'] || '',
            currentCategory:
              params['currentCategory'].slice(1).charAt(0).toUpperCase() +
                params['currentCategory'].slice(1).slice(1) || '',
            sourceName: params['sourceName'],
          };
        })
      )
      .subscribe((mappedData) => {
        this.detailData = mappedData;
      });
    this.formattedDate = this.dateFormat.formatDate(
      this.detailData.publishedAt
    );
  }
}

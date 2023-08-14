import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetData {
  constructor() {}
  getNewsWithCategoryName(pageNum: number = 1, categoryName: string) {
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&page=${pageNum}&category=${
        categoryName ? categoryName : ''
      }&apiKey=${environment.apikey}`
    );
  }
}

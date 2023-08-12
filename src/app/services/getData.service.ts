import { Injectable } from '@angular/core';
import axios from 'axios';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetData {
  constructor() {}

  // getNewsWithoutQuery() {
  //   return axios.get(
  //     'https://newsapi.org/v2/top-headlines?country=us&apiKey=676f017549224f488970f1835f9db971'
  //   );
  // }
  // getNewsWithPageNum(pageNum: number) {
  //   return axios.get(
  //     `https://newsapi.org/v2/top-headlines?country=us&page=${pageNum}&apiKey=676f017549224f488970f1835f9db971`
  //   );
  // }
  getNewsWithCategoryName(pageNum: number = 1, categoryName: string) {
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&page=${pageNum}&category=${
        categoryName ? categoryName : ''
      }&apiKey=676f017549224f488970f1835f9db971`
    );
  }
}

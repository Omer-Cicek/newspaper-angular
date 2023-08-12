import { Injectable } from '@angular/core';
import axios from 'axios';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GetData {
  constructor() {}
  getNewsWithCategoryName(pageNum: number = 1, categoryName: string) {
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&page=${pageNum}&category=${
        categoryName ? categoryName : ''
      }&apiKey=0beb6e01b8a24e23a4c31170854bb1bc`
      // }&apiKey=676f017549224f488970f1835f9db971`
    );
  }
}

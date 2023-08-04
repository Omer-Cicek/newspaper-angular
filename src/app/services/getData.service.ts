import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class GetData {
  constructor() {}
  getNewsWithoutQuery() {
    return axios.get(
      'https://newsapi.org/v2/top-headlines?country=tr&apiKey=676f017549224f488970f1835f9db971'
    );
  }
  getNewsWithPageNum(pageNum: number) {
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=tr&page=${pageNum}&apiKey=676f017549224f488970f1835f9db971`
    );
  }
  getNewsWithCategoryName(categoryName: string, pageNum: number = 1) {
    return axios.get(
      `https://newsapi.org/v2/top-headlines?country=tr&page=${pageNum}&category=${categoryName}&apiKey=676f017549224f488970f1835f9db971`
    );
  }
}

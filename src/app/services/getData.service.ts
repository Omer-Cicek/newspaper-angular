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
}

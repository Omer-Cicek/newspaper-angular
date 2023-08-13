export interface newsData {
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
  ifNoImg: string;
  id: string;
  currentCategory: string;
  sourceName: string;
}

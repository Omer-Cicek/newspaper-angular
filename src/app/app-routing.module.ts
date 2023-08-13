import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { EachCategoriesComponent } from './pages/each-categories/each-categories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'business', component: EachCategoriesComponent },
  { path: 'entertainment', component: EachCategoriesComponent },
  { path: 'general', component: EachCategoriesComponent },
  { path: 'health', component: EachCategoriesComponent },
  { path: 'science', component: EachCategoriesComponent },
  { path: 'sports', component: EachCategoriesComponent },
  { path: 'technology', component: EachCategoriesComponent },
  { path: 'newsDetail/:id', component: NewsDetailComponent },
  //   { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

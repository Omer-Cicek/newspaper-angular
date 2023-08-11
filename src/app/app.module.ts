import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { InputComponentComponent } from './components/input-component/input-component.component';
import { ErrorComponent } from './components/error/error.component';
import { EachCategoriesComponent } from './pages/each-categories/each-categories.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    AboutComponent,
    NewsCardComponent,
    ImageSliderComponent,
    PaginationComponent,
    InputComponentComponent,
    ErrorComponent,
    EachCategoriesComponent,
    CategoriesComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

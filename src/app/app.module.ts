import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BusinessComponent } from './pages/business/business.component';
import { EntertaintmentComponent } from './pages/entertaintment/entertaintment.component';
import { GeneralComponent } from './pages/general/general.component';
import { HealthComponent } from './pages/health/health.component';
import { ScienceComponent } from './pages/science/science.component';
import { SportsComponent } from './pages/sports/sports.component';
import { TechnologyComponent } from './pages/technology/technology.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { ImageSliderComponent } from './components/image-slider/image-slider.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { InputComponentComponent } from './components/input-component/input-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BusinessComponent,
    EntertaintmentComponent,
    GeneralComponent,
    HealthComponent,
    ScienceComponent,
    SportsComponent,
    TechnologyComponent,
    HeaderComponent,
    AboutComponent,
    NewsCardComponent,
    ImageSliderComponent,
    PaginationComponent,
    InputComponentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

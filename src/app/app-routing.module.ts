import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntertaintmentComponent } from './pages/entertaintment/entertaintment.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BusinessComponent } from './pages/business/business.component';
import { GeneralComponent } from './pages/general/general.component';
import { HealthComponent } from './pages/health/health.component';
import { ScienceComponent } from './pages/science/science.component';
import { SportsComponent } from './pages/sports/sports.component';
import { TechnologyComponent } from './pages/technology/technology.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'business', component: BusinessComponent },
  { path: 'entertainment', component: EntertaintmentComponent },
  { path: 'general', component: GeneralComponent },
  { path: 'health', component: HealthComponent },
  { path: 'science', component: ScienceComponent },
  { path: 'sports', component: SportsComponent },
  { path: 'technology', component: TechnologyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

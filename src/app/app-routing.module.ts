import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntertaintmentComponent } from './entertaintment/entertaintment.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'recipes',
    component: HomeComponent,
    // children: [
    //   { path: 'entertainment', component: EntertaintmentComponent },
    //   { path: 'new', component: RecipeEditComponent },
    //   {
    //     path: ':id',
    //     component: RecipeDetailComponent,
    //     resolve: [RecipesResolverService],
    //   },
    //   {
    //     path: ':id/edit',
    //     component: RecipeEditComponent,
    //     resolve: [RecipesResolverService],
    //   },
    // ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

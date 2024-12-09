import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'recommendations'
  },
  {
    path:'recommendations',
    loadComponent:()=>import('./components/movie-recommendation/movie-recommendation.component').then(e=>e.MovieRecommendationComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

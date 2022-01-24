import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { ActorsComponent } from './components/actors/actors.component';
import { MovieActorsComponent } from './components/movie-actors/movie-actors.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'actors', component: ActorsComponent },
  {
    path: 'movie-actors/:mov_id/:mov_title',
    component: MovieActorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

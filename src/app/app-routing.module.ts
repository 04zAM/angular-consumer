import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { ActorsComponent } from './components/actors/actors.component';
import { MovieActorsComponent } from './components/movie-actors/movie-actors.component';
import { LeagueComponent } from './components/league/league.component';
import { TeamComponent } from './components/team/team.component';
import { LeagueTeamComponent } from './components/league-team/league-team.component';
import { TeamLeagueComponent } from './components/team-league/team-league.component';
import { FacturaComponent } from './components/factura/factura.component';
import { FacturaDetalleComponent } from './components/factura-detalle/factura-detalle.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'actors', component: ActorsComponent },
  {
    path: 'movie-actors/:mov_id/:mov_title',
    component: MovieActorsComponent,
  },
  { path: 'team', component: TeamComponent },
  {
    path: 'team-league',
    component: TeamLeagueComponent,
  },
  { path: 'league', component: LeagueComponent },
  {
    path: 'league-team',
    component: LeagueTeamComponent,
  },
  { path: 'factura', component: FacturaComponent },
  {
    path: 'factura-detalle',
    component: FacturaDetalleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

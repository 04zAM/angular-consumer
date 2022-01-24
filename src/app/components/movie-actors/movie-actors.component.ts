import { Component, OnInit } from '@angular/core';
import { MovieActorsService } from 'src/app/services/movie-actors.service';
import { ModelMovieActors } from 'src/app/model/model.movie-actors';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModelActors } from 'src/app/model/model.actors';
import { ActorsService } from 'src/app/services/actors.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-actors',
  templateUrl: './movie-actors.component.html',
  styleUrls: ['./movie-actors.component.css'],
})
export class MovieActorsComponent implements OnInit {
  movieActors: ModelMovieActors[] = [];
  actors: ModelActors[] = [];
  public form!: FormGroup;

  //para obtener datos
  public idMovie!: number;
  public titleMovie!: '';
  public idActor!: number;

  constructor(
    private formBuilder: FormBuilder,
    private movieActorsService: MovieActorsService,
    private actorsService: ActorsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.idMovie = parseInt(params['mov_id']);
      this.titleMovie = params['mov_title'];
    });
    this.cargarMovieActors();
    this.cargarActors();
    this.form = this.formBuilder.group({
      actorsSelected: [],
      actorPrincipal: false,
    });
  }

  //agregar metodos
  public cargarMovieActors() {
    this.movieActorsService
      .getMovieActors(this.idMovie)
      .subscribe((movieActors: any) => (this.movieActors = movieActors));
  }

  public cargarActors() {
    this.actorsService
      .getActors()
      .subscribe((actor: any) => (this.actors = actor));
  }

  public postMovieActors() {
    this.movieActorsService
      .postMovieActors({
        mov_id: this.idMovie,
        act_id: this.form.value.actorsSelected,
        act_mov_actor_principal: this.form.value.actorPrincipal,
      })
      .subscribe((respuesta) => {
        console.log('Movie Actors creado correctamente');
        this.form.reset();
        this.cargarMovieActors();
      });
  }

  public deleteMovieActors(act_mov_id: any) {
    this.movieActorsService
      .deleteMovieActors(act_mov_id)
      .subscribe((respuesta) => {
        console.log('Movie Actors eliminado correctamente');
        this.cargarMovieActors();
      });
  }
}

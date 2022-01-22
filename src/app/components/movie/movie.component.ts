import { Component, OnInit } from '@angular/core';
import { ModelMovies } from 'src/app/model/model.movie';
import { MovieService } from '../../services/movie.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  public form!: FormGroup;
  public informacionMovie = {
    mov_id: -1,
    mov_title: '',
    mov_producer: '',
    mov_state: true,
  };

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) {}

  movies: ModelMovies[] = [];

  ngOnInit(): void {
    this.cargarMovies();
    this.form = this.formBuilder.group({
      txtTitle: [''],
      txtProducer: [''],
      chkState: [true],
    });
  }

  public cargarMovies() {
    this.movieService.getMovies().subscribe(
      (movie: any) => {
        this.movies = movie;
        console.log(this.movies);
      },
      (error) => console.log(error)
    );
  }

  public crearMovie() {
    this.movieService
      .postMovie({
        mov_title: this.form.value.txtTitle,
        mov_producer: this.form.value.txtProducer,
        mov_state: this.form.value.chkState,
      })
      .subscribe((res) => {
        console.log('Pelicula creada correctamente');
        this.cargarMovies();
      });
  }

  public eliminarMovie(mov_id: any) {
    //   this.pizzaService
    //     .deletePizza(piz_id)
    //     .subscribe((res) => console.log('Pizza eliminada correctamente'));
    //   this.cargarPizza();
  }

  public actualizarMovie(mov_id: any) {
    //   this.pizzaService
    //     .putUpdatePizza({
    //       piz_id: piz_id,
    //       piz_name: this.form.value.txtname,
    //       piz_origin: this.form.value.txtorigin,
    //       piz_state: this.form.value.txtstate,
    //     })
    //     .subscribe((res) => {
    //       console.log('Pizza actualizada correctamente.');
    //       this.cargarPizza();
    //     });
  }

  public infoUpdateMovie(
    mov_id: any,
    mov_title: any,
    mov_producer: any,
    mov_state: any
  ) {
    this.informacionMovie.mov_id = mov_id;
    this.informacionMovie.mov_title = mov_title;
    this.informacionMovie.mov_producer = mov_producer;
    this.informacionMovie.mov_state = mov_state;
  }
}

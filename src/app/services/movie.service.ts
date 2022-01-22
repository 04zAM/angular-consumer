import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  public getMovies() {
    const url = `http://localhost:5000/api/movies`;
    return this.http.get(url);
  }

  public postMovie(body: any) {
    const url = `http://localhost:5000/api/movies`;
    return this.http.post(url, body);
  }
}

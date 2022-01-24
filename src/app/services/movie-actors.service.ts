import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MovieActorsService {
  constructor(private http: HttpClient) {}

  public getMovieActors(mov_id: any) {
    const url = `http://localhost:5000/api/actorMovie/` + mov_id;
    return this.http.get(url);
  }

  public postMovieActors(body: any) {
    const url = `http://localhost:5000/api/actorMovie`;
    return this.http.post(url, body);
  }

  public deleteMovieActors(act_mov_id: any) {
    const url = `http://localhost:5000/api/del/actorMovie/` + act_mov_id;
    return this.http.get(url);
  }

  public putUpdateMovieActors(body: any) {
    const url = `http://localhost:5000/api/edit/actorMovie`;
    return this.http.post(url, body);
  }
}

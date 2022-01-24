import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ActorsService {
  constructor(private http: HttpClient) {}

  public getActors() {
    const url = `http://localhost:5000/api/actors`;
    return this.http.get(url);
  }

  public postActor(body: any) {
    const url = `http://localhost:5000/api/actors`;
    return this.http.post(url, body);
  }

  public deleteActor(act_id: any) {
    const url = `http://localhost:5000/api/del/actor/` + act_id;
    return this.http.get(url);
  }

  public putUpdateActor(body: any) {
    const url = `http://localhost:5000/api/edit/actor`;
    return this.http.post(url, body);
  }
}

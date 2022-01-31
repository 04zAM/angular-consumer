import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  public getClientes() {
    const url = `http://localhost:4000/clientes`;
    return this.http.get(url);
  }
}

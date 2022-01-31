import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private http: HttpClient) {}

  public getProductos() {
    const url = `http://localhost:4000/productos`;
    return this.http.get(url);
  }
}

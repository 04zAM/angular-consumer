import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DetalleService {
  constructor(private http: HttpClient) {}

  public getDetalle(body: any) {
    const url = `http://localhost:4000/detallefacturaIdFactura`;
    return this.http.get(url, body);
  }

  public postDetalle(body: any) {
    const url = `http://localhost:4000/detallefactura`;
    return this.http.post(url, body);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FacturaService {
  constructor(private http: HttpClient) {}

  public getFacturas() {
    const url = `http://localhost:4000/factura`;
    return this.http.get(url);
  }

  public postFactura(body: any) {
    const url = `http://localhost:4000/factura`;
    return this.http.post(url, body);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/models/cliente';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  productoURL = 'http://localhost:8080/producto/';

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>('http://localhost:3000/Clientes');
  }

  public detail(id: number): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.productoURL + `detail/${id}`);
  }

  public detailName(nombre: string): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.productoURL + `detailname/${nombre}`);
  }

  public save(producto: Cliente): Observable<any> {
    return this.httpClient.post<any>(this.productoURL + 'create', producto);
  }

  public update(id: number, producto: Cliente): Observable<any> {
    return this.httpClient.put<any>(this.productoURL + `update/${id}`, producto);
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}

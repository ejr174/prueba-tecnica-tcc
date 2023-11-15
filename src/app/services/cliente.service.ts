import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente, ClienteCrear } from 'src/models/cliente';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  productoURL = 'http://localhost:3000/Clientes';

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

  public save(cliente: ClienteCrear): Observable<any> {
    return this.httpClient.post<any>('http://localhost:3000/Clientes', cliente);
  }

  public update(id: number, cliente: Cliente): Observable<any> {
    const url = `${this.productoURL}/${id}`;
    return this.httpClient.put<any>(url, cliente);
  }
  
  /*
  public update(id: number, cliente: Cliente): Observable<any> {
    return this.httpClient.put<any>(this.productoURL, cliente);
  }*/

  public delete(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.productoURL + `delete/${id}`);
  }
}

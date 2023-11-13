import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/models/cliente';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {
  clientes: any[] = [];

  constructor(
    private clienteService: ClienteService
    ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.clienteService.lista().subscribe(
      (resp : any) => {
        console.log("Entro", resp.data)
        this.clientes = resp.data;
                
      },
      err => {
        console.error('Error la obtener cliente',err)
    })          
  }

  borrar(id: number): void {
    console.log(`Borrar el ${id}`)
  }

  getTipoIdentificacion(tipoIdentificacionID: number): string {
    switch (tipoIdentificacionID) {
      case 1:
        return 'Cédula Ciudadanita';
      case 2:
        return 'NIT';
      case 3:
        return 'Cédula de Extranjería';
      default:
        return 'Desconocido';
    }
  }

  getGenero(generoID: number): string {
    switch (generoID) {
      case 1:
        return 'Masculino';
      case 2:
        return 'Femenino';      
      default:
        return 'Desconocido';
    }
  }  
}

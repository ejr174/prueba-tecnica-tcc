import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/models/cliente';
import { NgModule } from '@angular/core';
import Swal from 'sweetalert2';

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
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.lista().subscribe(
      (resp : any) => {
        this.clientes = resp.data;              
      },
      err => {
        console.error('Error la obtener cliente',err)
    })          
  }

  borrar(id: number): void {
    Swal.fire({
      title: "¿Estás seguro de eliminar el Cliente?",
      text: "No podrás recuperar la información del cliente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "rgb(137 137 137)",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(id).subscribe( res => {
          this.cargarClientes();
        });
        Swal.fire({
          title: "¡Eliminado!",
          text: "El cliente fue eliminado de la base de datos",
          icon: "success",
          confirmButtonColor : "#a5dc86"
        });
      }
    });    
  }

  getTipoIdentificacion(tipoIdentificacionID: number): string {
    switch (tipoIdentificacionID) {
      case 1:
        return 'Cédula Ciudadania';
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearClienteComponent } from 'src/components/cliente/crear-cliente/crear-cliente.component';
import { DetalleClienteComponent } from 'src/components/cliente/detalle-cliente/detalle-cliente.component';
import { EditarClienteComponent } from 'src/components/cliente/editar-cliente/editar-cliente.component';
import { ListaClientesComponent } from 'src/components/cliente/lista-clientes/lista-clientes.component';

const routes: Routes = [
  {path: '', component: ListaClientesComponent},
  {path: 'detalle/:id', component: DetalleClienteComponent},
  {path: 'nuevo', component: CrearClienteComponent},
  {path: 'editar/:id', component: EditarClienteComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

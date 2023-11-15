import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//External
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ListaClientesComponent } from 'src/components/cliente/lista-clientes/lista-clientes.component';
import { CrearClienteComponent } from 'src/components/cliente/crear-cliente/crear-cliente.component';
import { EditarClienteComponent } from 'src/components/cliente/editar-cliente/editar-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearClienteComponent,
    ListaClientesComponent,    
    EditarClienteComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

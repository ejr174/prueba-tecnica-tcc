import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/models/cliente';


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']})
  
export class CrearClienteComponent {
  clienteForm!: FormGroup;

  // Lista de opciones para los selects
  tiposIdentificacion = [
    { id: 1, nombre: 'Cédula Ciudadanita' },
    { id: 2, nombre: 'NIT' },
    { id: 3, nombre: 'Cédula de Extranjería' },
    // Agrega más tipos según tus necesidades
  ];

  generos = [
    { id: 1, nombre: 'Masculino' },
    { id: 2, nombre: 'Femenino' },
    // Agrega más géneros según tus necesidades
  ];

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {
  
  }
  

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      TipoIdentificacionID: [null, Validators.required],
      NumeroIdentificacion: ['', Validators.required],
      Nombre: ['', Validators.required],
      GeneroID: [null, Validators.required],
      CorreoElectronico: ['', [Validators.required, Validators.email]],
      Telefono: ['', Validators.required],

    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
    const tipoIdentificacionIDValue: number = Number(this.clienteForm.get('TipoIdentificacionID')?.value);
    this.clienteForm.patchValue({ TipoIdentificacionID: tipoIdentificacionIDValue });
    const generoIDValue: number = Number(this.clienteForm.get('GeneroID')?.value);
    this.clienteForm.patchValue({ GeneroID: generoIDValue });    
    console.log(this.clienteForm.value)    
    if (this.clienteForm.valid) {

      const cliente: Cliente = this.clienteForm.value;
      this.clienteService.save(cliente).subscribe(
        response => {
          console.log('Cliente guardado exitosamente', response);
          // Puedes hacer algo adicional después de guardar el cliente
        },
        error => {
          console.error('Error al guardar el cliente', error);
          // Puedes manejar el error aquí
        }
      );
    } else {
      console.log('Formulario no válido. Por favor, verifica los campos.');
    }
  }

}

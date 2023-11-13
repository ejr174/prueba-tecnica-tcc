import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente, ClienteCrear } from 'src/models/cliente';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']})
  
export class CrearClienteComponent {
  clienteForm!: FormGroup;

  formularioNoValido : Boolean = false;

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
      FechaRegistro: [this.getCurrentDateTime(), Validators.required],
    });
  }

  // Método para enviar el formulario
  onSubmit(): void {
    this.formularioNoValido = false;
    
    const tipoIdentificacionIDValue: number = Number(this.clienteForm.get('TipoIdentificacionID')?.value);
    this.clienteForm.patchValue({ TipoIdentificacionID: tipoIdentificacionIDValue });
    const generoIDValue: number = Number(this.clienteForm.get('GeneroID')?.value);
    this.clienteForm.patchValue({ GeneroID: generoIDValue });    
    const telefonoValue: string = this.clienteForm.get('Telefono')?.value.toString();
    this.clienteForm.patchValue({ Telefono: telefonoValue });    
    const NumeroIdentificacionValue: string = this.clienteForm.get('NumeroIdentificacion')?.value.toString();
    this.clienteForm.patchValue({ NumeroIdentificacion: NumeroIdentificacionValue });        

    console.log(this.clienteForm.value)    
    if (this.clienteForm.valid) {

      const cliente: ClienteCrear = this.clienteForm.value;
      console.log("Cliente enviado", cliente)
      this.clienteService.save(cliente).subscribe(
        response => {
          console.log('Cliente guardado exitosamente', response);
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Los datos se crearon correctamente.',
            confirmButtonColor: '#a5dc86',
            confirmButtonText: 'Perfecto'              
          })          

          this.clienteForm.reset();
          // Puedes hacer algo adicional después de guardar el cliente
        },
        error => {
          console.error('Error al guardar el cliente', error);
          alert("Error al crear cliente")
          // Puedes manejar el error aquí
        }
      );
    } else {
      this.formularioNoValido = true;
      console.log('Formulario no válido. Por favor, verifica los campos.');
    }
  }

  private getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    const seconds = ('0' + now.getSeconds()).slice(-2);
    const milliseconds = ('00' + now.getMilliseconds()).slice(-3);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
  }  
    

}

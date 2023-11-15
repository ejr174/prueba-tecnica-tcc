import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/models/cliente';
import Swal from 'sweetalert2';

interface ClienteObjeto {
  TipoIdentificacionID : number;
  NumeroIdentificacion: number;
  Nombre :string;
  GeneroID : number;
  CorreoElectronico: string,
  Telefono: number,  
}

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {
  clienteForm!: FormGroup;
  idCliente : number = 0;
  clientes: any[] = [];
  formularioNoValido : Boolean = false;
  clienteEncontrado : ClienteObjeto  = {
    TipoIdentificacionID : 0,
    NumeroIdentificacion : 0,
    Nombre : '',
    GeneroID : 0,
    CorreoElectronico : '',
    Telefono : 0
  };


  cliente : Cliente = {
    ClienteID: 0,
    TipoIdentificacionID: 0,
    NumeroIdentificacion: '',
    Nombre: '',
    GeneroID: 0,
    CorreoElectronico: '',
    Telefono: '',
    FechaRegistro : ''   
  };

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
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

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

    this.cargarClientes();
  
    const params = this.activatedRoute.snapshot.params;
    this.idCliente = params["id"];
  }

  cargarClientes(): void {
    this.clienteService.lista().subscribe(
      (resp : any) => {
        this.clientes = resp.data;
        if (this.clientes.length > 0){
          this.consultarCliente(this.idCliente)
        } else{
          alert("Error al cargar cliente");
        }
        
                
      },
      err => {
        console.error('Error la obtener cliente',err)
    })          
  }  

  consultarCliente(id:number){
    let cliente = {}
    if(id > 0){
      if (this.clientes.length > 0){
        const clienteEncontrado = this.clientes.find(cliente => {
          let idClientee : number = id
          if(cliente.ClienteID == id){
            this.clienteEncontrado = cliente;
          }
        });

        if (this.clienteEncontrado) {
          const { TipoIdentificacionID, NumeroIdentificacion, Nombre, GeneroID, CorreoElectronico, Telefono } = this.clienteEncontrado;

          this.clienteForm.patchValue({
            TipoIdentificacionID: TipoIdentificacionID,
            NumeroIdentificacion: NumeroIdentificacion,
            Nombre: Nombre,
            GeneroID: GeneroID,
            CorreoElectronico: CorreoElectronico,
            Telefono: Telefono,
          }); 
        } else {
          console.error('Cliente no encontrado');
        }
      };
    };
  };

  onUpdate(): void {
    let id = this.activatedRoute.snapshot.params//.id;
    let id2 = 0
    this.clienteService.update(id2, this.cliente).subscribe(
      data => {
        this.toastr.success('Producto Actualizado', 'OK', {
          timeOut: 3000, positionClass: 'toast-top-center'
        });
        this.router.navigate(['/']);
      },
      err => {
        this.toastr.error(err.error.mensaje, 'Fail', {
          timeOut: 3000,  positionClass: 'toast-top-center',
        });
        this.router.navigate(['/']);
      }
    );
  }

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

      const cliente: Cliente = this.clienteForm.value;
      console.log("Cliente enviado", cliente)
      this.clienteService.update(this.idCliente, cliente).subscribe(
        response => {
          console.log('Cliente actualizado exitosamente', response);
          Swal.fire({
            icon: 'success',
            title: '¡Perfecto!',
            text: 'Cliente actualizado correctamente.',
            confirmButtonColor: '#a5dc86',
            confirmButtonText: 'Perfecto'              
          })          

          this.router.navigate(['/']);
          //this.clienteForm.reset();
          // Puedes hacer algo adicional después de guardar el cliente
        },
        error => {
          console.error('Error al guardar el cliente', error);
          Swal.fire({
            icon: 'error',
            title: '¡Oops!',
            text: 'No se pudo actualizar el cliente correctamente.',
            confirmButtonColor: '#a5dc86',
            confirmButtonText: 'Perfecto'              
          })               
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

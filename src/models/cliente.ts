export interface Cliente {
    ClienteID: number;
    TipoIdentificacionID: number;
    NumeroIdentificacion: string;
    Nombre: string;
    GeneroID: number;
    CorreoElectronico: string;
    Telefono: string;
    FechaRegistro: string; // Puedes cambiar el tipo según tus necesidades
}

export interface Cliente {
    ClienteID: number;
    TipoIdentificacionID: number;
    NumeroIdentificacion: string;
    Nombre: string;
    GeneroID: number;
    CorreoElectronico: string;
    Telefono: string;
    FechaRegistro : string;
}

export interface ClienteCrear {
    TipoIdentificacionID: number;
    NumeroIdentificacion: string;
    Nombre: string;
    GeneroID: number;
    CorreoElectronico: string;
    Telefono: string;
    FechaRegistro : Date;
}

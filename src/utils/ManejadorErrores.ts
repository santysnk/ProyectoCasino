export class ArchivoNoEncontradoError extends Error {
    constructor(mensaje: string = "No se encontro el archivo de saldo. Se comienza con saldo 0.") {
        super(mensaje);
        this.name = "ArchivoNoEncontradoError";
    }
}




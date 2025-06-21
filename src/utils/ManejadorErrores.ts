// Clase para manejar errores cuando no se encuentra el archivo de saldo
export class ArchivoNoEncontradoError extends Error {

    // El constructor recibe un mensaje como parametro, si no se le pasa ninguno, se usa el mensaje por defecto
    constructor(mensaje: string = "No se encontro el archivo de saldo. Se comienza con saldo 0.") {  
        super(mensaje);                              // Llama al constructor de la clase padre
        this.name = "ArchivoNoEncontradoError";      // Setea el nombre del error
    };
};




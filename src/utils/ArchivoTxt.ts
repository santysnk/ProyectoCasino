import * as fs from 'fs';                                         // Importo fs para manejar archivos
import * as path from 'path';                                     // Importo path para manejar rutas
import * as rs from 'readline-sync';                              // Importo readline-sync para leer la entrada del usuario
import { ArchivoNoEncontradoError } from "./ManejadorErrores";    // Importo la clase ArchivoNoEncontradoError

// Defino la ruta del archivo
const rutaArchivo = path.join(__dirname, '../../saldo.txt');

// Funcion para guardar el saldo en el archivo
export function guardarSaldo(saldo: number): void {
    fs.writeFileSync(rutaArchivo, saldo.toString(), 'utf-8');
}

// Funcion para leer el saldo del archivo
export function leerSaldo(): number {
    try {
        
        if (!fs.existsSync(rutaArchivo)) {                          // Si el archivo no existe
            throw new ArchivoNoEncontradoError();                   // Lanza error
        };    
        
        const contenido = fs.readFileSync(rutaArchivo, 'utf-8');    // Lee el contenido del archivo
        const saldo = Number(contenido);                            // Convierte el contenido a numero
        
        if (isNaN(saldo)) {                                         // Si el saldo no es un numero
            return 0;                                               // Retorna 0
        } else {                                                    // Si el saldo es un numero
            return saldo;                                           // Retorna el saldo
        };
        
    } catch (error) {                                               // Si hay un error
            console.warn("⚠️   " + (error as ArchivoNoEncontradoError).message);    // Muestra error de la clase ArchivoNoEncontradoError en ManejadorErrores.ts
            rs.question("Presione ENTER para volver al menu...");
        return 0;                                                   // En caso de error retorna 0, como saldo inicial.
    };

};



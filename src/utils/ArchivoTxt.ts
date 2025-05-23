import * as fs from 'fs';
import * as path from 'path';
import * as rs from 'readline-sync';
import { ArchivoNoEncontradoError } from "./ManejadorErrores";


const rutaArchivo = path.join(__dirname, '../../saldo.txt');

export function guardarSaldo(saldo: number): void {
    fs.writeFileSync(rutaArchivo, saldo.toString(), 'utf-8');
}

export function leerSaldo(): number {
    try {
        
        if (!fs.existsSync(rutaArchivo)) {
            throw new ArchivoNoEncontradoError();
        }    
        
        const contenido = fs.readFileSync(rutaArchivo, 'utf-8');
        const saldo = Number(contenido);
        
        if (isNaN(saldo)) {
            return 0;
        } else {
            return saldo;
        }
        
    } catch (error) {
            console.warn("⚠️   " + (error as ArchivoNoEncontradoError).message);
            rs.question("Presione ENTER para volver al menu...");
        return 0;
    }
}



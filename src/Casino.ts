import { caraCruz } from "./src/Clases/Juegos/CaraOCruz"; 
import { leerSaldo, guardarSaldo } from "./utils/ArchivoTxt";
import * as rs from 'readline-sync';


export class Casino {
    private static instancia: Casino | null = null;  // 1. única instancia
    private saldo: number;
    private juegoscaraCaruz: caraCruz[];
    
    // 2. constructor privado para evitar `new Casino()` desde afuera
    private constructor() {
        this.saldo = leerSaldo();
        this.juegoscaraCaruz = [];  // inicializamos el array vacío
        this.juegoscaraCaruz.push(new caraCruz(this));  // pasamos this como referencia del casino
        this.juegoscaraCaruz.push(new caraCruz(this));     // pasamos this como referencia del casino
    }

    // 3. método público para obtener la instancia única
    public static getInstance(): Casino {
        if (this.instancia === null) {
            this.instancia = new Casino();
        }
        return this.instancia;
    }

    cargarCreditos(pMonto: number): void {
        this.saldo += pMonto;
    }

    obtenerSaldo(): number {
        return this.saldo;
    }

    guardarSaldoEnArchivo(): void {
        guardarSaldo(this.saldo);
    }

    descontarApuesta(pApuesta: number): boolean {
        if (pApuesta > this.saldo) {
            console.log("No tienes saldo suficiente 💸");
            rs.question("Presione ENTER para volver al menu...");
            return false;
        }
            this.saldo -= pApuesta;
        return true;
    }

    getTragamonedasFrutas(){
        return this.juegoscaraCaruz[0];
    }

    getTragamonedasBar(){
        return this.juegoscaraCaruz[1];
    }


}

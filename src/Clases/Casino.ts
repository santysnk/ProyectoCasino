import { leerSaldo, guardarSaldo } from "../utils/ArchivoTxt";
import * as rs from 'readline-sync';


export class Casino {
    private saldo: number;


    constructor() {
        this.saldo = leerSaldo();

    }

    cargarCreditos(monto: number): void {
        this.saldo += monto;
    }

    obtenerSaldo(): number {
        return this.saldo;
    }

    guardarSaldoEnArchivo(): void {
        guardarSaldo(this.saldo);
    }

    private descontarApuesta(apuesta: number): boolean {
        if (apuesta > this.saldo) {
            console.log("❌ No tenés saldo suficiente.");
            rs.question("Presione ENTER para volver al menú...");
            return false;
        }
        this.saldo -= apuesta;
        return true;
    }

    
}

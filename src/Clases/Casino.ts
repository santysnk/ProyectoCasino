import { Ruleta } from "../Juegos/Ruleta/ruleta";
import { leerSaldo, guardarSaldo } from "../utils/ArchivoTxt";
import * as rs from 'readline-sync';


export class Casino {
    private static instancia: Casino | null = null;  // 1. única instancia
    private saldo: number;
    private ruleta: Ruleta;
    
    // 2. constructor privado para evitar `new Casino()` desde afuera
    private constructor() {
        this.saldo = leerSaldo();
        this.ruleta = new Ruleta (this);
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
            console.log("❌ No tenés saldo suficiente.");
            rs.question("Presione ENTER para volver al menu...");
            return false;
        }
            this.saldo -= pApuesta;
        return true;
    }

    getRuleta(){
        return this.ruleta
    }


}

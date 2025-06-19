// Módulo para manejar la entrada/salida por consola
import * as rs from 'readline-sync';
// Funciones para manejar el guardado y carga del saldo
import { leerSaldo, guardarSaldo } from "../utils/ArchivoTxt";

// Importación de los diferentes juegos disponibles
import { Ruleta } from "../Juegos/Ruleta/ruleta";
import { Tragamonedas } from "../Juegos/Tragamonedas/Clases/AbsTragamonedas";
import { TragamonedasBar } from "../Juegos/Tragamonedas/Clases/TragamonedasBar";
import { TragamonedasFrutas } from "../Juegos/Tragamonedas/Clases/TragamonedasFrutas";
import { mayorMenor } from "../Juegos/mayorMenor/mayorMenor";

// Clase principal del Casino que implementa el patrón Singleton
// Gestiona el saldo del jugador y los juegos disponibles
export class Casino {
    private static instancia: Casino | null = null;  // Única instancia del patrón Singleton
    private saldo: number;                          // Saldo actual del jugador
    private ruleta: Ruleta;                         // Instancia del juego de ruleta
    private juegosTragamonedas: Tragamonedas[];     // Lista de juegos de tragamonedas disponibles
    private mayorMenor: mayorMenor;                 // Instancia del juego Mayor o Menor

    // Constructor privado para forzar el uso de getInstance()
    // Inicializa el casino cargando el saldo guardado y creando las instancias de los juegos
    private constructor() {
        this.saldo = leerSaldo();  // Carga el saldo desde el archivo de persistencia
        this.ruleta = new Ruleta(this);  // Inicializa el juego de ruleta
        this.juegosTragamonedas = [];  // Inicialización del array de juegos de tragamonedas
        
        // Inicialización de los juegos disponibles
        // Se crean las instancias de cada juego y se almacenan para su posterior acceso
        this.juegosTragamonedas.push(new TragamonedasFrutas(this));  // Inicializa Tragamonedas de frutas
        this.juegosTragamonedas.push(new TragamonedasBar(this));     // Inicializa Tragamonedas de barras
        this.mayorMenor = new mayorMenor(this);  // Inicializa el juego Mayor o Menor
    }

    // Devuelve la única instancia del Casino, creándola si es necesario
    public static getInstance(): Casino {
        if (this.instancia === null) {
            this.instancia = new Casino();
        }
        return this.instancia;
    }

    // Añade créditos al saldo actual del jugador
    // parametro pMonto - La cantidad de créditos a agregar al saldo
    cargarCreditos(pMonto: number): void {
        this.saldo += pMonto;  // Incrementa el saldo con el monto proporcionado
    }

    // Devuelve el saldo actual del jugador
    obtenerSaldo(): number {
        return this.saldo;
    }


    // Guarda el saldo actual en el archivo de persistencia
    guardarSaldoEnArchivo(): void {
        guardarSaldo(this.saldo);
    }

    // Intenta descontar una apuesta del saldo actual
    // Devuelve true si se pudo descontar, false si no hay saldo suficiente
    descontarApuesta(pApuesta: number): boolean {
        if (pApuesta > this.saldo) {
            console.log("❌ No tenés saldo suficiente.");
            rs.question("Presione ENTER para volver al menu...");
            return false;
        }
        this.saldo -= pApuesta;
        return true;
    }

    // retorna La instancia del juego de Ruleta
    getRuleta(): Ruleta {
        return this.ruleta;
    }

    // retorna La instancia de TragamonedasFrutas (primer elemento del array de tragamonedas)
    getTragamonedasFrutas(): TragamonedasFrutas {
        return this.juegosTragamonedas[0] as TragamonedasFrutas;
    }

    // retorna La instancia de TragamonedasBar (segundo elemento del array de tragamonedas)
    getTragamonedasBar(): TragamonedasBar {
        return this.juegosTragamonedas[1] as TragamonedasBar;
    }

    // retorna La instancia del juego Mayor o Menor
    getMayorMenor(): mayorMenor {
        return this.mayorMenor;
    }
}

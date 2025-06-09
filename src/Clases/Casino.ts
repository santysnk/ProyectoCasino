// Importación de módulos necesarios
import { Tragamonedas } from "../Juegos/Tragamonedas/Clases/AbsTragamonedas";
import { TragamonedasBar } from "../Juegos/Tragamonedas/Clases/TragamonedasBar";
import { TragamonedasFrutas } from "../Juegos/Tragamonedas/Clases/TragamonedasFrutas";
import { leerSaldo, guardarSaldo } from "../utils/ArchivoTxt";
import * as rs from 'readline-sync';

/**
 * Clase principal que representa el Casino.
 * Implementa el patrón Singleton para garantizar una única instancia.
 * Gestiona el saldo del jugador y los juegos disponibles.
 */
export class Casino {
    // Implementación del patrón Singleton
    private static instancia: Casino | null = null;  // Almacena la única instancia
    
    // Atributos de la clase
    private saldo: number;                          // Saldo actual del jugador
    private juegosTragamonedas: Tragamonedas[];     // Lista de juegos de tragamonedas disponibles
    
    /**
     * Constructor privado para evitar la creación directa de instancias.
     * Carga el saldo desde archivo e inicializa los juegos disponibles.
     */
    private constructor() {
        this.saldo = leerSaldo();  // Carga el saldo guardado
        this.juegosTragamonedas = [];  // Inicializa el array de juegos vacío
        
        // Agrega los juegos de tragamonedas disponibles
        // Se pasa 'this' como referencia al casino para permitir la comunicación
        this.juegosTragamonedas.push(new TragamonedasFrutas(this));
        this.juegosTragamonedas.push(new TragamonedasBar(this));
    }

    /**
     * Método estático para obtener la instancia única del Casino.
     * Si no existe, crea una nueva instancia.
     * retorna La instancia única del Casino
     */
    public static getInstance(): Casino {
        if (this.instancia === null) {
            this.instancia = new Casino();
        }
        return this.instancia;
    }

    /**
     * Añade créditos al saldo actual del jugador.
     * parametro pMonto - Cantidad de créditos a cargar
     */
    cargarCreditos(pMonto: number): void {
        this.saldo += pMonto;
    }

    /**
     * Obtiene el saldo actual del jugador.
     * retorna El saldo actual
     */
    obtenerSaldo(): number {
        return this.saldo;
    }

    /**
     * Guarda el saldo actual en un archivo para persistencia.
     * Se llama al cerrar la aplicación.
     */
    guardarSaldoEnArchivo(): void {
        guardarSaldo(this.saldo);
    }

    /**
     * Intenta descontar una apuesta del saldo actual.
     * parametro pApuesta - Monto a descontar
     * retorna true si se pudo descontar, false si no hay saldo suficiente
     */
    descontarApuesta(pApuesta: number): boolean {
        if (pApuesta > this.saldo) {
            console.log("❌ No tienes saldo suficiente.");
            rs.question("Presione ENTER para volver al menu...");
            return false;
        }
        this.saldo -= pApuesta;
        return true;
    }

    /**
     * Obtiene la instancia del juego de Tragamonedas de Frutas.
     * retorna Instancia de TragamonedasFrutas
     */
    getTragamonedasFrutas() {
        return this.juegosTragamonedas[0];
    }

    /**
     * Obtiene la instancia del juego de Tragamonedas de Bar.
     * retorna Instancia de TragamonedasBar
     */
    getTragamonedasBar() {
        return this.juegosTragamonedas[1];
    }
}

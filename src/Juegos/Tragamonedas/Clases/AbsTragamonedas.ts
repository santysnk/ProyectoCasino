// Importación de interfaces y clases necesarias
import { IJuego } from "../../InterfaceJuego";
import { Casino } from '../../../Clases/Casino';

/**
 * Clase abstracta que representa un juego de Tragamonedas genérico.
 * Implementa la interfaz IJuego y define la estructura común para todos los juegos de tragamonedas.
 * Utiliza el patrón Template Method para definir el esqueleto del algoritmo de juego.
 */
export abstract class Tragamonedas implements IJuego { 
    // Atributos protegidos accesibles por las clases hijas
    protected casino: Casino;       // Referencia al casino para acceder al saldo
    protected nombre: string;       // Nombre del juego de tragamonedas
    protected apuesta: number;      // Apuesta actual del jugador
    protected simbolos: string[];   // Símbolos disponibles en el juego
    protected matriz: string[][];   // Matriz que representa los rodillos
    protected premios: number[];    // Lista de premios disponibles
    protected Ganado: number;       // Cantidad ganada en la última jugada

    /**
     * Constructor de la clase base Tragamonedas.
     * parametro pCasino - Referencia a la instancia del casino
     * parametro pNombre - Nombre del juego de tragamonedas
     * parametro pSimbolos - Array de símbolos que se usarán en el juego
     */
    constructor(pCasino: Casino, pNombre: string, pSimbolos: string[]) {
        this.nombre = pNombre;
        this.casino = pCasino;
        this.apuesta = 0;           // Inicializa la apuesta en 0
        this.simbolos = pSimbolos;   // Establece los símbolos del juego
        this.matriz = [];            // Inicializa la matriz vacía
        this.premios = [];           // Inicializa el array de premios
        this.Ganado = 0;             // Inicializa lo ganado en 0
    }

    /**
     * Obtiene el monto de la apuesta actual.
     * retorna El monto de la apuesta actual
     */
    getApuesta(): number {
        return this.apuesta;
    }

    /**
     * Establece el monto de la apuesta.
     * parametro pApuesta - Monto de la apuesta a establecer
     */
    setApuesta(pApuesta: number): void {
        this.apuesta = pApuesta;
    }

    /**
     * Obtiene la cantidad ganada en la última jugada.
     * retorna La cantidad ganada
     */
    getGanado(): number {
        return this.Ganado;
    }
    
    /**
     * Muestra la matriz de resultados en la consola.
     * Debe ser implementado por las clases hijas.
     */
    abstract mostrarMatriz(): void;

    /**
     * Muestra una demostración de la matriz (sin afectar el juego real).
     * Debe ser implementado por las clases hijas.
     */
    abstract mostrarMatrizDemo(): void;

    /**
     * Método principal que contiene la lógica del juego.
     * Debe ser implementado por las clases hijas.
     */
    abstract jugar(): void;

    /**
     * Calcula y paga el premio según la combinación obtenida.
     * Debe ser implementado por las clases hijas.
     */
    abstract pagarPremio(): void;
}
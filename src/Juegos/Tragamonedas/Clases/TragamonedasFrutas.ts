import { Tragamonedas } from "./AbsTragamonedas";
import { Casino } from "../../../Clases/Casino";

/**
 * Clase que implementa un juego de Tragamonedas de Frutas.
 * Extiende la clase abstracta Tragamonedas y define la lógica específica
 * para el juego con símbolos de frutas.
 */
export class TragamonedasFrutas extends Tragamonedas {
    // Dimensiones de la matriz de juego
    private cantFilas: number;
    private cantColumnas: number;

    /**
     * Crea una nueva instancia del juego de Tragamonedas de Frutas.
     * parametro pCasino - Referencia a la instancia del casino.
     */
    constructor(pCasino: Casino) {
        // Símbolos disponibles: cereza, limón, sandía, uva, fresa
        const simbol = ["🍒", "🍋", "🍉", "🍇", "🍓"];
        super(pCasino, "Tragamonedas de Frutas", simbol);
        this.premios = [];
        this.cantFilas = 5;     // 5 filas en la matriz
        this.cantColumnas = 5;   // 5 columnas en la matriz
    }

    /**
     * Obtiene los símbolos disponibles en el juego.
     * retorna un Array con los emojis de frutas.
     */
    getSimbolos(): string[] {
        return this.simbolos;
    }

    /**
     * Inicia una nueva partida de tragamonedas.
     * Genera una nueva matriz de símbolos aleatorios y calcula los premios.
     */
    jugar(): void {
        this.matriz = [];  // Reiniciamos la matriz para un nuevo juego
        this.premios = []; // Limpiamos los premios anteriores

        // Obtenemos los símbolos disponibles
        const simbolos = this.getSimbolos();
        // Creamos una matriz vacía para el resultado
        const resultado: string[][] = [];

        // Generamos la matriz de símbolos aleatorios
        for (let c = 0; c < this.cantColumnas; c++) {
            const fila: string[] = [];

            for (let f = 0; f < this.cantFilas; f++) {
                // Elegimos un símbolo al azar
                const indice = Math.floor(Math.random() * simbolos.length);
                fila.push(simbolos[indice]);
            }

            // Agregamos la fila completa a la matriz de resultados
            resultado.push(fila);
        }


        this.matriz = resultado; // Guardamos la matriz generada

        // Calculamos los premios para cada fila
        this.premios = this.matriz.map(fila => this.calcularPremioPorFila(fila));
        this.pagarPremio(); // Procesamos los premios
    }

    /**
     * Calcula el premio para una fila específica basado en secuencias de símbolos iguales.
     * parametro fila - La fila de símbolos a evaluar.
     * retorna Un número que representa el multiplicador del premio (0 si no hay premio).
     */
    private calcularPremioPorFila(fila: string[]): number {
        let maxRepetidos = 1; // Mínimo de símbolos iguales necesarios para premio
        let contador = 1;     // Contador de símbolos iguales consecutivos

        // Recorremos la fila para encontrar secuencias
        for (let i = 1; i < fila.length; i++) {
            if (fila[i] === fila[i - 1]) {
                contador++;
                if (contador > maxRepetidos) {
                    maxRepetidos = contador;
                }
            } else {
                contador = 1; // Reiniciamos el contador al cambiar de símbolo
            }
        }

        // Asignamos premios según la secuencia más larga encontrada
        if (maxRepetidos >= 5) return 3; // x10 por 5 símbolos iguales
        if (maxRepetidos === 4) return 2; // x5 por 4 símbolos iguales
        if (maxRepetidos === 3) return 1; // x2 por 3 símbolos iguales

        return 0; // Sin premio
    }

    /**
     * Muestra la matriz de juego en la consola con formato.
     * Incluye indicadores de premio cuando corresponda.
     */
    mostrarMatriz(): void {
        console.log("+---------------------------------------------------+");
        console.log("|                                                   |");

        if (this.matriz?.[0]?.length) {
            // Mostrar cada fila de la matriz
            for (let i = 0; i < this.matriz.length; i++) {
                const fila = this.matriz[i];
                let premio : number = 0;

                // Obtenemos el premio para esta fila si existe
                if (this.premios && i < this.premios.length) {
                    premio = this.premios[i];
                }

                // Determinamos la etiqueta del premio
                let etiqueta = "";
                switch (premio) {
                    case 1: 
                        etiqueta = "⬅️   x2"; 
                        break;
                    case 2: 
                        etiqueta = "⬅️   x5"; 
                        break;
                    case 3: 
                        etiqueta = "⬅️   x10"; 
                        break;
                }

                // Formateamos y mostramos la línea
                const linea = fila.map(f => `[ ${f} ]`).join("  ");
                console.log("|      " + linea + "       |" + (etiqueta ? ` ${etiqueta}` : ""));
            }

            console.log("|                                                   |");
            console.log("+---------------------------------------------------+\n");
        } else {
            // Si no hay matriz, mostramos la demo
            this.mostrarMatrizDemo();
            console.log("|                                                   |");
            console.log("+---------------------------------------------------+\n");
        }
    }


    /**
     * Muestra una matriz de demostración con todos los símbolos alineados.
     * Se usa cuando no hay una matriz de juego activa.
     */
    mostrarMatrizDemo(): void {
        // Matriz de demostración con una fila por cada símbolo
        const matrizDemo = [
            ["🍇", "🍇", "🍇", "🍇", "🍇"],
            ["🍓", "🍓", "🍓", "🍓", "🍓"],
            ["🍉", "🍉", "🍉", "🍉", "🍉"],
            ["🍋", "🍋", "🍋", "🍋", "🍋"],
            ["🍒", "🍒", "🍒", "🍒", "🍒"],
        ];

        // Mostrar cada fila de la demo
        for (const fila of matrizDemo) {
            const linea = fila.map(f => `[ ${f} ]`).join("  ");
            console.log("|      " + linea + "       |");
        }
    }

    /**
     * Calcula y paga los premios según las combinaciones obtenidas.
     * Los premios se calculan en base a las secuencias encontradas en cada fila.
     */
    pagarPremio(): void {
        // Si no hay premios, salir
        if (!this.premios || this.premios.length === 0) {
            return;
        } 
        
        let totalPremio = 0;

        // Sumamos los premios de todas las filas
        for (const premio of this.premios) {
            switch (premio) {
                case 1: // x2 por 3 símbolos iguales
                    totalPremio += this.apuesta * 2;
                    break;
                case 2: // x5 por 4 símbolos iguales
                    totalPremio += this.apuesta * 5;
                    break;
                case 3: // x10 por 5 símbolos iguales
                    totalPremio += this.apuesta * 10;
                    break;
                default:
                    break;
            }
        }

        // Guardamos el total ganado
        this.Ganado = totalPremio;

        // Si hay premio, lo acreditamos al jugador
        if (totalPremio > 0) {
            this.casino.cargarCreditos(totalPremio);
        }
    }
}
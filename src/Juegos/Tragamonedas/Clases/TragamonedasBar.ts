import { Tragamonedas } from "./AbsTragamonedas";
import { Casino } from "../../../Clases/Casino";

/**
 * Clase que implementa un juego de Tragamonedas de Bar.
 * Extiende la clase abstracta Tragamonedas y define la lógica específica
 * para el juego con símbolos de tragos y cócteles.
 * 
 * Características principales:
 * - Matriz de 3x3 símbolos
 * - Sistema de premios basado en símbolos específicos
 * - Premio doble en la fila del medio
 */
export class TragamonedasBar extends Tragamonedas {
    // Dimensiones de la matriz de juego (3x3)
    private cantFilas: number;
    private cantColumnas: number;
    
    /**
     * Tabla de premios que asigna un multiplicador a cada símbolo.
     * La clave es el emoji del símbolo y el valor es el multiplicador de premio.
     */
    private tablaPremios: { [clave: string]: number };

    /**
     * Crea una nueva instancia del juego de Tragamonedas de Bar.
     * parametro pCasino - Referencia a la instancia del casino.
     */
    constructor(pCasino: Casino) {
        // Símbolos disponibles: cóctel, cóctel tropical, vino, cerveza, champaña
        const simbol = ["🍸", "🍹", "🍷", "🍺", "🍾"];
        super(pCasino, "Tragamonedas de BAR", simbol);
        this.premios = [];
        this.cantFilas = 3;      // 3 filas en la matriz
        this.cantColumnas = 3;    // 3 columnas en la matriz
        
        // Configuración de la tabla de premios
        this.tablaPremios = {
            "🍸": 2,    // Cóctel - Paga x2
            "🍹": 3,    // Cóctel tropical - Paga x3
            "🍺": 4,    // Cerveza - Paga x4
            "🍷": 5,    // Vino - Paga x5
            "🍾": 10    // Champaña - Paga x10 (premio mayor)
        };
    }


    /**
     * Obtiene los símbolos disponibles en el juego.
     * retorna Array con los emojis de tragos.
     */
    getSimbolos(): string[] {
        return this.simbolos;
    }

    /**
     * Inicia una nueva partida de tragamonedas.
     * Genera una nueva matriz de símbolos aleatorios y calcula los premios.
     */
    jugar(): void {
        // Reiniciamos el estado del juego
        this.matriz = [];
        this.premios = [];

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
        this.premios = this.matriz.map((fila, i) => this.calcularPremioPorFila(fila, i));
        this.pagarPremio(); // Procesamos los premios
    }

    /**
     * Calcula el premio para una fila específica basado en la combinación de símbolos.
     * parametro fila - La fila de símbolos a evaluar.
     * parametro filaIndex - El índice de la fila (0 = superior, 1 = medio, 2 = inferior).
     * retorna El multiplicador de premio (0 si no hay combinación ganadora).
     */
    private calcularPremioPorFila(fila: string[], filaIndex: number): number {
        const [simbolo1, simbolo2, simbolo3] = fila;

        // Verificamos si los tres símbolos son iguales
        const hayTresIguales = simbolo1 === simbolo2 && simbolo2 === simbolo3;
        if (!hayTresIguales) {
            return 0; // No hay premio si no hay tres símbolos iguales
        }

        // Obtenemos el multiplicador base según el símbolo
        const multiplicadorBase = this.tablaPremios[simbolo1] || 0;

        // Si es la fila del medio, duplicamos el premio
        if (filaIndex === 1) {
            return multiplicadorBase * 2;
        }
        return multiplicadorBase;
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
                const multiplicador = this.premios?.[i] ?? 0;

                // Creamos la etiqueta del premio si hay un multiplicador
                let etiqueta = "";
                if (multiplicador > 0) {
                    etiqueta = `⬅️   x${multiplicador}`;
                }

                // Formateamos y mostramos la línea
                const linea = fila.map(f => `[ ${f} ]`).join("   ");
                console.log("|             " + linea + "              |" + (etiqueta ? ` ${etiqueta}` : ""));
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
     * Muestra una matriz de demostración con una disposición específica de símbolos.
     * Se usa cuando no hay una matriz de juego activa.
     */
    mostrarMatrizDemo(): void {
        // Matriz de demostración con símbolos de ejemplo
        const matrizDemo = [
            ["🍸", "🍷", "🍹"],  // Fila superior
            ["🍾", "🍹", "🍾"],  // Fila del medio (con posibles premios)
            ["🍷", "🍺", "🍸"]   // Fila inferior
        ];

        // Mostrar cada fila de la demo
        for (const fila of matrizDemo) {
            const linea = fila.map(f => `[ ${f} ]`).join("   ");
            console.log("|             " + linea + "              |");
        }
    }

    /**
     * Calcula y paga los premios según las combinaciones obtenidas.
     * Los premios se calculan multiplicando la apuesta por el multiplicador de cada fila ganadora.
     */
    pagarPremio(): void {
        // Si no hay premios, salir
        if (!this.premios || this.premios.length === 0) {
            return;
        }
        
        // Calculamos el premio total sumando los premios de todas las filas
        let totalPremio = this.premios.reduce((total, multiplicador) => {
            return total + (this.apuesta * multiplicador);
        }, 0);

        // Guardamos el total ganado
        this.Ganado = totalPremio;

        // Si hay premio, lo acreditamos al jugador
        if (totalPremio > 0) {
            this.casino.cargarCreditos(totalPremio);
        }
    }
}
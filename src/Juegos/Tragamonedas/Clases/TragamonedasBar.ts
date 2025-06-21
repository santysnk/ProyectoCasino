// Importación de interfaces y clases necesarias
import { Tragamonedas } from "./AbsTragamonedas";
import { Casino } from "../../../ClasePrincipal/Casino";

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
    constructor(pCasino:Casino) {
        // Símbolos disponibles: cóctel, cóctel tropical, vino, cerveza, champaña
        const simbol = ["🍸", "🍹", "🍷", "🍺", "🍾"];

        super(pCasino, "Tragamonedas de BAR", simbol);  // Llama al constructor de la clase base
        this.premios = [];                              // Inicializa el array de premios
        this.cantFilas = 3;                             // 3 filas en la matriz
        this.cantColumnas = 3;                          // 3 columnas en la matriz
        
        // Configuración de la tabla de premios
        this.tablaPremios = {
            "🍸": 2,    // Cóctel - Paga x2
            "🍹": 3,    // Cóctel tropical - Paga x3
            "🍺": 4,    // Cerveza - Paga x4
            "🍷": 5,    // Vino - Paga x5
            "🍾": 10    // Champaña - Paga x10 (premio mayor)
        };
    };


    /**
     * Obtiene los símbolos disponibles en el juego.
     * retorna Array con los emojis de tragos.
     */
    getSimbolos():string[] {
        return this.simbolos;
    };

    /**
     * Inicia una nueva partida de tragamonedas.
     * Genera una nueva matriz de símbolos aleatorios y calcula los premios.
     */
    jugar():void {
        // Reiniciamos el estado del juego
        this.matriz = [];
        this.premios = [];

        // Obtenemos los símbolos disponibles
        const simbolos = this.getSimbolos();

        // Creamos una matriz vacía para el resultado
        const resultado: string[][] = [];

        // Generamos la matriz de símbolos aleatorios
        for (let c = 0; c < this.cantColumnas; c++) {
            const fila: string[] = [];                                        // Creamos una fila vacía

            for (let f = 0; f < this.cantFilas; f++) {                        // Recorremos las filas
                
                const indice = Math.floor(Math.random() * simbolos.length);   // Obtenemos un índice al azar

                fila.push(simbolos[indice]);                                  // Agregamos el símbolo a la fila
            };

            resultado.push(fila);                                             // Agregamos la fila completa a la matriz de resultados
        };

        this.matriz = resultado;                                              // Guardamos la matriz generada

        // Calculamos los premios para cada fila
        this.premios = this.matriz.map((fila, i) => this.calcularPremioPorFila(fila, i));   // Calculamos los premios para cada fila, pasamos la fila y el índice de la fila en la matriz
        this.pagarPremio();                                                                 // Procesamos los premios
    };

    /**
     * Calcula el premio para una fila específica basado en la combinación de símbolos.
     * parametro fila - La fila de símbolos a evaluar.
     * parametro filaIndex - El índice de la fila (0 = superior, 1 = medio, 2 = inferior).
     * retorna El multiplicador de premio (0 si no hay combinación ganadora).
     */
    private calcularPremioPorFila(fila: string[], filaIndex: number): number {
        const simbolo1:string = fila[0];
        const simbolo2:string = fila[1];
        const simbolo3:string = fila[2];

        // Verificamos si los tres símbolos son iguales
        const hayTresIguales:boolean = simbolo1 === simbolo2 && simbolo2 === simbolo3;

        //************ Si no hay tres símbolos iguales ************

        if (!hayTresIguales) {
            return 0;      // Retornamos: 0
        };

        //************ Si los tres símbolos son iguales ************

        // Obtenemos el multiplicador base según el símbolo, podemos usar el simbolo1, simbolo2 o simbolo3
        const multiplicadorBase:number = this.tablaPremios[simbolo1];

        
        if (filaIndex === 1) {
            return multiplicadorBase * 2;     // Si es la fila del medio, duplicamos el premio
        };

        return multiplicadorBase;             // Retornamos el multiplicador base
    };

    /**
     * Muestra la matriz de juego en la consola con formato.
     * Incluye indicadores de premio cuando corresponda.
     */
    mostrarMatriz():void {
        console.log("+---------------------------------------------------+");
        console.log("|                                                   |");

        // Verificamos si hay una matriz, si tiene al menos un elemento y ese elemento tiene una longitud (es decir, es un array no vacío)
        if (this.matriz && this.matriz[0] && this.matriz[0].length > 0) {       

            // Mostrar cada fila de la matriz
            for (let i = 0; i < this.matriz.length; i++) {   // Recorremos la matriz
                
                let fila = this.matriz[i];                   // Obtenemos la fila actual
                let multiplicador = 0;                       // Inicializamos el multiplicador en 0

                // Si hay premios, si el premio no es undefined y si el premio no es null
                if (this.premios && this.premios[i] !== undefined && this.premios[i] !== null) {
                    multiplicador = this.premios[i];        // Obtenemos el premio
                };

                // Creamos la etiqueta del premio si hay un multiplicador
                let etiqueta:string = "";                             // Inicializamos la etiqueta vacia

                if (multiplicador > 0) {                              // Si el multiplicador es mayor a 0
                    etiqueta = `⬅️   x${multiplicador}`;              // Creamos la etiqueta
                };

                // Formateamos y mostramos la línea
                const linea = fila.map(i => `[ ${i} ]`).join("   ");     // Formateamos la línea, utilizando el método map para crear una nueva matriz con los símbolos formateados
                console.log("|             " + linea + "              |" + (etiqueta ? ` ${etiqueta}` : "")); // Mostramos la línea
            };

            console.log("|                                                   |");
            console.log("+---------------------------------------------------+\n");
        } else {
            // Si no hay matriz, mostramos la demo
            this.mostrarMatrizDemo();
            console.log("|                                                   |");
            console.log("+---------------------------------------------------+\n");
        };
    };


    /**
     * Muestra una matriz de demostración con una disposición específica de símbolos.
     * Se usa cuando no hay una matriz de juego activa.
     */
    mostrarMatrizDemo():void {

        // Matriz de demostración con símbolos de ejemplo
        const matrizDemo = [
            ["🍸", "🍷", "🍹"],  // Fila superior
            ["🍾", "🍹", "🍾"],  // Fila del medio (con posibles premios)
            ["🍷", "🍺", "🍸"]   // Fila inferior
        ];

        // Mostrar cada fila de la demo
        for (const fila of matrizDemo) {
            const linea = fila.map(i => `[ ${i} ]`).join("   ");
            console.log("|             " + linea + "              |");
        };
    };

    /**
     * Calcula y paga los premios según las combinaciones obtenidas.
     * Los premios se calculan multiplicando la apuesta por el multiplicador de cada fila ganadora.
     */
    pagarPremio():void {
        // Si no hay premios, salir
        if (!this.premios || this.premios.length === 0) {
            return;
        };
        
        // Inicializamos el total del premio
        let totalPremio = 0;

        // Recorremos cada multiplicador y sumamos el premio de cada fila
        for (const multiplicador of this.premios) {                  // Recorremos cada multiplicador
            let premioFila = this.apuesta * multiplicador;           // Calculamos el premio de cada fila
            totalPremio += premioFila;                               // Sumamos el premio de cada fila
        };

        // Guardamos el total ganado
        this.Ganado = totalPremio;

        // Si hay premio, lo acreditamos al jugador
        if (totalPremio > 0) {
            this.casino.cargarCreditos(totalPremio);
        };
    };

};
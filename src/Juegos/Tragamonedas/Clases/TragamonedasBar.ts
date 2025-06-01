import { Tragamonedas } from "./AbsTragamonedas";
import { Casino } from "../../../Clases/Casino";


export class TragamonedasBar extends Tragamonedas {
    
    private cantFilas: number;                            // Cantidad de filas y columnas del juego (3x3)
    private cantColumnas: number;
    private tablaPremios: { [clave: string]: number };    // Objeto literal que actúa como tabla de premios. Cada símbolo tiene asignado un multiplicador base.

    constructor(pCasino: Casino) {
        const simbol = ["🍸", "🍹", "🍷", "🍺", "🍾"];  // Definimos los símbolos que aparecerán en el tragamonedas
        super(pCasino, "Tragamonedas de BAR",simbol);
        this.premios = [];
        this.cantFilas = 3;
        this.cantColumnas = 3;
        this.tablaPremios = {     // Asignamos los multiplicadores para cada símbolo. Se utilizarán para calcular el premio cuando haya una fila con 3 símbolos iguales.
            "🍸": 2,             // Paga x2
            "🍹": 3,             // Paga x3
            "🍺": 4,             // Paga x4
            "🍷": 5,             // Paga x5
            "🍾": 10             // Paga x10
        };
    }

    getSimbolos():string[]{
        return this.simbolos
    }


    jugar(): void {
        this.matriz = [];  //  Reiniciamos la matriz para un nuevo juego
        this.premios = []; // Limpiar para la próxima jugada

        const simbolos = this.getSimbolos();     // Obtenemos el array de tragos definido en la clase (🍸, 🍹, 🍺, 🍷, ☘️)
        const resultado: string[][] = [];        // Creamos una matriz vacía que contendrá 3 filas, cada una con 3 tragos

        for (let c = 0; c < this.cantColumnas; c++) {
            const fila: string[] = [];  // Creamos una nueva fila vacía

            for (let f = 0; f < this.cantFilas ; f++) {

                // Elegimos un indice al azar
                const indice = Math.floor(Math.random() * simbolos.length);

                fila.push(simbolos[indice]);
            }

            // Agregamos el trago a la fila actual
            resultado.push(fila); 
        }

        this.matriz = resultado; // Guardamos el resultado en el atributo de clase

         // Calcular los premios por fila y guardarlos
        this.premios = this.matriz.map((fila, i) => this.calcularPremioPorFila(fila, i));
        this.pagarPremio();

    }

    private calcularPremioPorFila(fila: string[], filaIndex: number): number {
        const simbolo1 = fila[0];
        const simbolo2 = fila[1];
        const simbolo3 = fila[2];

        // Verificamos si los tres símbolos son iguales
        const hayTresIguales = simbolo1 === simbolo2 && simbolo2 === simbolo3;
        if (!hayTresIguales) {
            return 0;
        }

        // Buscamos el multiplicador base según el símbolo
        let multiplicadorBase = 0;
        if (this.tablaPremios.hasOwnProperty(simbolo1)) {
            multiplicadorBase = this.tablaPremios[simbolo1];
        }

        // Si es la fila del medio (filaIndex === 1), se duplica el premio
        if (filaIndex === 1) {
            return multiplicadorBase * 2;
        }
        return multiplicadorBase;
    }

    mostrarMatriz(): void {
        console.log("+---------------------------------------------------+");
        console.log("|                                                   |");

        if (this.matriz?.[0]?.length) {
            for (let i = 0; i < this.matriz.length; i++) {
                const fila = this.matriz[i];
                const multiplicador = this.premios?.[i] ?? 0;

                let etiqueta = "";
                if (multiplicador > 0) {
                    etiqueta = `⬅️   x${multiplicador}`;
                }

                const linea = fila.map(f => `[ ${f} ]`).join("   ");
                console.log("|             " + linea + "              |" + (etiqueta ? ` ${etiqueta}` : ""));
            }

            console.log("|                                                   |");
            console.log("+---------------------------------------------------+\n");
        } else {
            this.mostrarMatrizDemo();
            console.log("|                                                   |");
            console.log("+---------------------------------------------------+\n");
        }
    }

    mostrarMatrizDemo(): void {
        const matrizDemo = [
            ["🍸", "🍷", "🍹"],
            ["🍾", "🍹", "🍾"],
            ["🍷", "🍺", "🍸"],
        ];

        for (const fila of matrizDemo) {
            const linea = fila.map(f => `[ ${f} ]`).join("   ");
            console.log("|             " + linea + "              |");
        }
    }


    pagarPremio(): void {
        if (!this.premios || this.premios.length === 0) {
            return;
        }    

        let totalPremio = 0;

        for (let multiplicador of this.premios) {
            totalPremio += this.apuesta * multiplicador;
        }

        this.Ganado = totalPremio;

        if (totalPremio > 0) {
            this.casino.cargarCreditos(totalPremio);
        }
    }
}
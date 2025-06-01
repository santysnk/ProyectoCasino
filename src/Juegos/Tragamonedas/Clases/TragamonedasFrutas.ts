import { Tragamonedas } from "./AbsTragamonedas";
import { Casino } from "../../../Clases/Casino";
import * as rs from 'readline-sync';

export class TragamonedasFrutas extends Tragamonedas {
    private cantFilas: number;
    private cantColumnas: number;

    constructor(pCasino: Casino) {
        const simbol = ["🍒", "🍋", "🍉", "🍇", "🍓"];
        super(pCasino, "Tragamonedas de Frutas",simbol);
        this.premios = [];
        this.cantFilas = 5;
        this.cantColumnas = 5;
    }

    getSimbolos():string[]{
        return this.simbolos
    }


    jugar(): void {
        this.matriz = [];  //  Reiniciamos la matriz para un nuevo juego
        this.premios = []; // Limpiar para la próxima jugada

        const simbolos = this.getSimbolos();     // Obtenemos el array de frutas definido en la clase (🍒, 🍋, 🍉, 🍇, 🍓)
        const resultado: string[][] = [];        // Creamos una matriz vacía que contendrá 5 filas, cada una con 5 frutas

        for (let c = 0; c < this.cantColumnas; c++) {
            const fila: string[] = [];  // Creamos una nueva fila vacía

            for (let f = 0; f < this.cantFilas; f++) {

                // Elegimos un indice al azar
                const indice = Math.floor(Math.random() * simbolos.length);

                fila.push(simbolos[indice]);
            }

            // Agregamos la fruta a la fila actual
            resultado.push(fila); 
        }

        this.matriz = resultado; // Guardamos el resultado en el atributo de clase

         // Calcular los premios por fila y guardarlos
        this.premios = this.matriz.map(fila => this.calcularPremioPorFila(fila));
        this.pagarPremio();

    }

    private calcularPremioPorFila(fila: string[]): number {
        let maxRepetidos = 1;
        let contador = 1;

        for (let i = 1; i < fila.length; i++) {
            if (fila[i] === fila[i - 1]) {
                contador++;
                if (contador > maxRepetidos) {
                    maxRepetidos = contador;
                }
            } else {
                contador = 1; // se corta la secuencia
            }
        }

        // Evaluar premio según secuencia contigua más larga
        if (maxRepetidos >= 5) return 3; // x10
        if (maxRepetidos === 4) return 2; // x5
        if (maxRepetidos === 3) return 1; // x2

        return 0;
    }

    mostrarMatriz(): void {
        console.log("+---------------------------------------------------+");
        console.log("|                                                   |");

        if (this.matriz?.[0]?.length) {
            for (let i = 0; i < this.matriz.length; i++) {
                const fila = this.matriz[i];
                let premio : number = 0;

                if (this.premios && i < this.premios.length) {
                    premio = this.premios[i];
                }

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

                const linea = fila.map(f => `[ ${f} ]`).join("  ");
                console.log("|      " + linea + "       |" + (etiqueta ? ` ${etiqueta}` : ""));
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
            ["🍇", "🍇", "🍇", "🍇", "🍇"],
            ["🍓", "🍓", "🍓", "🍓", "🍓"],
            ["🍉", "🍉", "🍉", "🍉", "🍉"],
            ["🍋", "🍋", "🍋", "🍋", "🍋"],
            ["🍒", "🍒", "🍒", "🍒", "🍒"],
        ];

        for (const fila of matrizDemo) {
            const linea = fila.map(f => `[ ${f} ]`).join("  ");
            console.log("|      " + linea + "       |");
        }
    }


    pagarPremio(): void {
        if (!this.premios || this.premios.length === 0){
            return;
        } 

        let totalPremio = 0;

        for (const premio of this.premios) {
            switch (premio) {
                case 1: // x2
                    totalPremio += this.apuesta * 2;
                    break;
                case 2: // x5
                    totalPremio += this.apuesta * 5;
                    break;
                case 3: // x10
                    totalPremio += this.apuesta * 10;
                    break;

                default:
                    break;
            }
        }

        this.Ganado = totalPremio;

        if (totalPremio > 0) {
            this.casino.cargarCreditos(totalPremio);
        }
    }
}
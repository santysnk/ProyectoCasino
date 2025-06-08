import rs from 'readline-sync';
import { Casino } from '../../../Casino';

export class CaraCruz {
    private casino: Casino;
    private eleccion: string;

    constructor(casino: Casino) {
        this.casino = casino;
        this.eleccion = "";
    }

    /** Método para jugar una partida */
    public jugar(): void {
        this.mostrarMenuElegirCara();
        const resultado = this.obtenerUnoODos();
        console.log(`La moneda cayó en: ${resultado}`);

        if (resultado === this.eleccion) {
            console.log("¡Ganaste!");
        } else {
            console.log("¡Perdiste!");
        }

        this.jugarDobleONada();
    }

    /** Método para mostrar el menú de elección */
    private mostrarMenuElegirCara(): void {
        let salir: boolean = false;

        while (!salir) {
            console.clear();
            console.log("🎲 Bienvenido al juego de Cara o Cruz 🎲");
            console.log("1. Elegir Cara 🟩");
            console.log("2. Elegir Cruz 🟥");
            console.log("0. Salir");

            const opcion: number = rs.questionInt("Seleccione una opción: ");

            switch (opcion) {
                case 1:
                    this.eleccion = "🤑";
                    console.log("Has elegido Cara 🟩");
                    salir = true;
                    break;
                case 2:
                    this.eleccion = "☠";
                    console.log("Has elegido Cruz 🟥");
                    salir = true;
                    break;
                case 0:
                    console.log("Gracias por jugar");
                    salir = true;
                    break;
                default:
                    console.log("❌ Opción inválida.");
                    rs.question("Presione ENTER para continuar...");
                    break;
            }
        }
    }

    /** Método para obtener un resultado aleatorio */
    private obtenerUnoODos(): string {
        const numeroAleatorio = Math.random();
        console.log(`Número aleatorio generado: ${numeroAleatorio}`);

        if (numeroAleatorio >= 0 && numeroAleatorio < 0.5) {
            return "🤑";
        } else {
            return "☠";
        }
    }

    /** Método para jugar doble o nada */
    private jugarDobleONada(): void {
        const quiereDobleONada = rs.question("¿Quieres jugar 'doble o nada'? Ingresa 'si' para jugar: ").trim().toLowerCase();

        if (quiereDobleONada === "si") {
            const resultadoDobleONada = this.obtenerUnoODos();
            console.log(`La moneda cayó en: ${resultadoDobleONada}`);

            if (resultadoDobleONada === this.eleccion) {
                console.log("¡Ganaste el doble!");
            } else {
                console.log("¡Perdiste todo!");
            }
        }
    }
}

// Crear una instancia de la clase y jugar
const casino = new Casino(); // Asegúrate de que la clase Casino esté definida correctamente
const juego = new CaraCruz(casino);
juego.jugar();
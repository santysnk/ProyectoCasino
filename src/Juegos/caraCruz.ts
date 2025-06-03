import { promises } from "dns";
import * as CaraCruz from 'readline-sync';
import rs from 'readline-sync';

/**mensaje de bienvenida y inicio */
async function caraCruz() {
    console.log("bienvenido haz tu apuesta");
}

/**mensaje de pregunta para apostar */
while (true) {
    const pregunta = rs.question("¿cara o cruz?"); // Uso de readlineSync para la entrada del usuario
    const apuesta = pregunta.trim().toLowerCase();
    if (apuesta === 'salir') {
        console.log("Juego terminado.");
        break;
    }
    if (apuesta === 'cara' || apuesta === 'cruz') {
        console.log(`Has elegido: ${apuesta}`);
    } else {
        console.log("Entrada inválida. Por favor, escribe 'cara' o 'cruz'.");
    }
}

/**menu para elegir cara o cruz */
function mostrarMenuElegirCara() {
    let salir: boolean = false;

    while (!salir) {
        console.clear();
        console.log("1.Elegir Cara 🟢");
        console.log("2.Elegir Cruz 🔴");
        console.log("0. Atras");

        const opcion: number = rs.questionInt("Seleccione una opcion"); // Uso de readlineSync para entrada numérica

        switch (opcion) {
            case 1: break;
            case 2: break;
            case 0:
                console.log("Gracias por jugar");
                salir = true;
                break;
            default:
                console.log("❌ Opción inválida.");
                rs.question("Presione ENTER para continuar..."); // Uso de readlineSync para pausa
                break;
        }
    }
}

/**es para tiro al azar en el juego */ /**si el valor es entre 0 y 0.5 va cara si es mayor entre 0.5 y 1 es cruz */
function obtenerUnoODos(): string {
    let numeroAleatorio = Math.random();
    console.log(numeroAleatorio);

    if (numeroAleatorio >= 0 && numeroAleatorio < 0.5) {
        return "🤑";
    } else {
        return "☠";
    }
}
let miNumeroAleatorio: string = obtenerUnoODos();
console.log(miNumeroAleatorio);

/*anotar en drae.io funcion de partidas ganadas o perdidas*/
async function jugarCaraOCruz() {
    let ganadas: Number = 0;
    let perdidas: Number = 0;

    console.log(`\n"Juego terminado. Ganaste" ${ganadas} "vez/veces y perdiste" ${perdidas}.`);
}
jugarCaraOCruz();


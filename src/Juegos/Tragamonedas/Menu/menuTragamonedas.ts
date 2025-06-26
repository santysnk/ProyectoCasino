import * as rs from 'readline-sync';                        // Importo readline-sync para leer la entrada del usuario
import { Casino } from '../../../ClasePrincipal/Casino';    // Importo la clase Casino
import { mostrarMenuFrutas } from './menuFrutas';           // Importo la funcion mostrarMenuFrutas
import { mostrarMenuBar } from './menuBar';                 // Importo la funcion mostrarMenuBar

// Funcion para mostrar el menu de Tragamonedas
// parametro pCasino - Instancia del casino para gestionar saldo y juego
export function mostrarMenuTragamonedas(pCasino:Casino) {
    let salir:boolean = false;         // Variable para controlar el bucle

    // Bucle principal para mostrar el menu de Tragamonedas
    while (!salir) {
        console.clear();       // Limpio la consola
        console.log("+--------------------------------------------------------------------------------------+");
        console.log("|      1. [ 🍇 TRAGAMONEDAS DE FRUTAS 🍒 ]       2. [ 🍸 TRAGAMONEDAS DE BAR 🍷 ]      |");              
        console.log("+--------------------------------------------------------------------------------------+\n");

        // Muestro el saldo actual
        console.log(`[ 💰 Saldo actual: $${pCasino.obtenerSaldo()} ]\n`);
        console.log("-----------------------------------");

        // Muestro las opciones
        console.log("1. Jugar Tragamonedas de Frutas");
        console.log("2. Jugar Tragamonedas Bar");
        console.log("0. Salir");
        console.log("-----------------------------------");

        const opcion:number = rs.questionInt("Seleccione una opcion: ");  // Pido la opcion al usuario

        // Proceso la opcion seleccionada
        switch (opcion) {
            case 1:
                mostrarMenuFrutas(pCasino)    // Muestro el menu de Tragamonedas de Frutas
                break;                        // Sale del switch
            case 2:
                mostrarMenuBar(pCasino)       // Muestro el menu de Tragamonedas Bar
                break;                        // Sale del switch
            case 0:
                salir = true;                 // Sale del bucle
                break;                        // Sale del switch

            default:                          // Caso default: Opcion no valida, muestra mensaje de error y vuelve al menu
                console.log("❌ Opcion invalida.");
                rs.question("Presione ENTER para continuar...");
                break;                        // Sale del switch
        }
    }
}


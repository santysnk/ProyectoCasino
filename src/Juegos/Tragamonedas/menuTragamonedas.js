"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mostrarMenuTragamonedas = mostrarMenuTragamonedas;
var rs = require("readline-sync");
function mostrarMenuTragamonedas(pCasino) {
    var salir = false;
    while (!salir) {
        console.clear();
        console.log("+--------------------------------------------------------------------------------------+");
        console.log("|     1. [ 🍇 TRAGAMONEDAS DE FRUTAS 🍒 ]      2. [ 🍸 TRAGAMONEDAS DE BAR 🍷 ]      |");
        console.log("+--------------------------------------------------------------------------------------+\n");
        console.log("[ \uD83D\uDCB0 Saldo actual: $".concat(pCasino.obtenerSaldo(), " ]\n"));
        console.log("-----------------------------------");
        console.log("1. Jugar Tragamonedas de Frutas");
        console.log("2. Jugar Tragamonedas Bar");
        console.log("0. Salir");
        console.log("-----------------------------------");
        var opcion = rs.questionInt("Seleccione una opcion: ");
        switch (opcion) {
            case 1:
                break;
            case 2:
                break;
            case 0:
                console.log("👋 Gracias por visitar el casino. ¡Hasta luego!");
                pCasino.guardarSaldoEnArchivo();
                salir = true;
                break;
            default:
                console.log("❌ Opción inválida.");
                rs.question("Presione ENTER para continuar...");
                break;
        }
    }
}

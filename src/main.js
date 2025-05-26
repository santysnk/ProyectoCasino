"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rs = require("readline-sync");
var Casino_1 = require("./Clases/Casino");
var casino = new Casino_1.Casino();
function mostrarMenuPrincipal() {
    var salir = false;
    while (!salir) {
        console.clear();
        console.log("+-----------------------------------------------------------------+");
        console.log("|            🎰 Bienvenido al Casino La Rula te seca 🎰           |");
        console.log("+-----------------------------------------------------------------+\n");
        console.log("[ \uD83D\uDCB0 Saldo actual: $".concat(casino.obtenerSaldo(), " ]\n"));
        console.log("-----------------------------------");
        console.log("1. Cargar créditos");
        console.log("2. Jugar Tragamonedas de Frutas");
        console.log("3. Jugar Blackjack");
        console.log("4. Jugar Ruleta");
        console.log("0. Salir");
        console.log("-----------------------------------");
        var opcion = rs.questionInt("Seleccione una opcion: ");
        switch (opcion) {
            case 1:
                console.log("\n-----------------------------------");
                var monto = rs.questionInt("Ingrese el monto a cargar: ");
                console.log("-----------------------------------");
                if (monto > 0) {
                    casino.cargarCreditos(monto);
                    console.log("\u2705 Se cargaron $".concat(monto, " correctamente."));
                }
                else {
                    console.log("❌ Monto inválido.");
                }
                rs.question("\nPresione ENTER para continuar...");
                break;
            case 2:
                // casino.jugarTragamonedas();
                break;
            case 3:
                // casino.jugarBlackjack();
                break;
            case 4:
                // casino.jugarRuedaFortuna();
                break;
            case 0:
                console.log("👋 Gracias por visitar el casino. ¡Hasta luego!");
                casino.guardarSaldoEnArchivo();
                salir = true;
                break;
            default:
                console.log("❌ Opción inválida.");
                rs.question("Presione ENTER para continuar...");
                break;
        }
    }
}
// Ejecutar menú principal
mostrarMenuPrincipal();

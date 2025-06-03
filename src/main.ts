import * as rs from 'readline-sync';
import { Casino } from './Clases/Casino';
import { mostrarMenuTragamonedas } from './Juegos/Tragamonedas/menuTragamonedas';
import { mostrarMenuRuleta } from './Juegos/Ruleta/menuRuleta';

const casino = Casino.getInstance(); 

function mostrarMenuPrincipal() {
    let salir:boolean = false;

    while (!salir) {
        console.clear();
        console.log("+-----------------------------------------------------------------+");
        console.log("|            🎰 Bienvenido al Casino La Rula te seca 🎰           |");              
        console.log("+-----------------------------------------------------------------+\n");
        console.log(`[ 💰 Saldo actual: $${casino.obtenerSaldo()} ]\n`);
        console.log("-------------------------------------------------");
        console.log("1. Cargar créditos");
        console.log("2. Jugar Tragamonedas");
        console.log("3. Jugar Blackjack");
        console.log("4. Jugar Ruleta");
        console.log("0. Salir");
        console.log("-----------------------------------");

        const opcion:number = rs.questionInt("Seleccione una opcion: ");

        switch (opcion) {
            case 1:
                console.log("\n-----------------------------------");
                const monto = rs.questionInt("Ingrese el monto a cargar: ");
                console.log("-----------------------------------");
                if ( monto > 0) {
                    casino.cargarCreditos(monto);
                    console.log(`✅ Se cargaron $${monto} correctamente.`);
                } else {
                    console.log("❌ Monto inválido.");
                }
                rs.question("\nPresione ENTER para continuar...");
                break;

            case 2:
                    mostrarMenuTragamonedas(casino) 
                break;

            case 3:
               // casino.jugarBlackjack();
                break;

            case 4:
                    mostrarMenuRuleta(casino)
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
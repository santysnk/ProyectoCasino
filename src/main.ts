import * as rs from 'readline-sync';
import { Casino } from './Clases/Casino';
import { mostrarMenuTragamonedas } from './Juegos/Tragamonedas/Menu/menuTragamonedas';
import { mostrarMenuRuleta } from './Juegos/Ruleta/menuRuleta';

const casino = Casino.getInstance(); 

/**
 * Función principal que muestra el menú del casino
 * Maneja la navegación entre las diferentes opciones del menú
 */
function mostrarMenuPrincipal() {
    // Variable de control para el bucle del menú
    let salir:boolean = false;

    // Bucle principal del menú
    while (!salir) {
        // Limpia la consola para una mejor experiencia de usuario
        console.clear();
        
        // Muestra el encabezado del casino
        console.log("+-----------------------------------------------------------------+");
        console.log("|            🎰 Bienvenido al Casino La Rula te seca 🎰           |");              
        console.log("+-----------------------------------------------------------------+\n");
        
        // Muestra el saldo actual del jugador
        console.log(`[ 💰 Saldo actual: $${casino.obtenerSaldo()} ]\n`);
        
        // Muestra las opciones del menú
        console.log("-------------------------------------------------");
        console.log("1. Cargar créditos");
        console.log("2. Jugar Tragamonedas");
        console.log("3. Jugar Blackjack");
        console.log("4. Jugar Ruleta");
        console.log("0. Salir");
        console.log("-------------------------------------------------");

        // Solicita una opción al usuario
        const opcion:number = rs.questionInt("Seleccione una opcion: ");

        // Manejo de la opción seleccionada
        switch (opcion) {
            case 1: // Cargar créditos
                console.log("\n-----------------------------------");
                const monto = rs.questionInt("Ingrese el monto a cargar: ");
                console.log("-----------------------------------");
                if (monto > 0) {
                    casino.cargarCreditos(monto);
                    console.log(`✅ Se cargaron $${monto} correctamente.`);
                } else {
                    console.log("❌ Monto inválido.");
                }
                // Pausa para que el usuario pueda ver el mensaje
                rs.question("\nPresione ENTER para continuar...");
                break;

            case 2: // Jugar Tragamonedas
                // Muestra el menú de tragamonedas pasando la instancia del casino
                mostrarMenuTragamonedas(casino);
                break;

            case 3: // Jugar Mayor o Menor (actualmente deshabilitado)
                // casino.jugarBlackjack();
                break;

            case 4:
					// Muestra el menú de Ruleta pasando la instancia del casino
                    mostrarMenuRuleta(casino)
                break;

            case 0: // Salir del juego
                console.log("👋 Gracias por visitar el casino. ¡Hasta luego!");
                casino.guardarSaldoEnArchivo(); // Guarda el saldo actual en el archivo
                salir = true; // Sale del bucle
                break;

            default: // Opción no válida
                console.log("❌ Opción inválida.");
                rs.question("Presione ENTER para continuar...");
                break;
        }
    }
}

// Punto de entrada principal de la aplicación
// Inicia mostrando el menú principal
mostrarMenuPrincipal();
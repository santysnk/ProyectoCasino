import * as rs from 'readline-sync';                        // Importo readline-sync para leer la entrada del usuario
import { Casino } from '../../../ClasePrincipal/Casino';    // Importo la clase Casino

// Funcion para mostrar el menu de Tragamonedas de Frutas
// parametro pCasino - Instancia del casino para gestionar saldo y juego
export function mostrarMenuFrutas(pCasino:Casino) {
    let salir : boolean = false;                              // Variable para controlar el bucle
    let jugarOk : boolean = false;                            // Variable para controlar si se puede jugar

    const frutas = pCasino.getTragamonedasFrutas();           // Instancio el Tragamonedas de Frutas

    // Bucle principal para mostrar el menu de Tragamonedas de Frutas
    while (!salir) {
        console.clear();                                      // Limpio la consola
        console.log("+---------------------------------------------------+");
        console.log("|     🍓 🍉    TRAGAMONEDAS DE FRUTAS   🍒 🍋 🍇    |");
        console.log("+---------------------------------------------------+");
        frutas.mostrarMatriz() ;                              // Muestro la matriz del Tragamonedas de Frutas

        // Muestro el saldo actual y el ganado de la ultima apuesta
        console.log(`[ 💰 Saldo actual: $${pCasino.obtenerSaldo()} , Ganado ultima apuesta: $${frutas.getGanado() - frutas.getApuesta()} ]\n`);
        console.log("-----------------------------------");

        // Muestro las opciones
        console.log("1. Apostar 10 creditos");
        console.log("2. Apostar 50 creditos");
        console.log("3. Apostar 100 creditos");
        console.log("4. Apostar 1000 creditos");
        console.log("0. Salir");
        console.log("-----------------------------------");

        const opcion:number = rs.questionInt("Seleccione una opcion: ");  // Pido la opcion al usuario

        // Proceso la opcion seleccionada
        switch (opcion) {
            case 1:
                jugarOk = pCasino.descontarApuesta(10);     // Desconto la apuesta
                if (jugarOk){
                    frutas.setApuesta(10);                  // Seteo la apuesta
                    frutas.jugar();                         // Juego
                }
                break;                                      // Sale del switch

            case 2:
                jugarOk = pCasino.descontarApuesta(50);     // Desconto la apuesta
                if (jugarOk){
                    frutas.setApuesta(50);                  // Seteo la apuesta
                    frutas.jugar();                         // Juego
                }
                break;                                      // Sale del switch

            case 3:
                jugarOk = pCasino.descontarApuesta(100);    // Desconto la apuesta
                if (jugarOk){
                    frutas.setApuesta(100);                 // Seteo la apuesta
                    frutas.jugar();                         // Juego
                }
                break;                                      // Sale del switch

            case 4:
                jugarOk = pCasino.descontarApuesta(1000);   // Desconto la apuesta
                if (jugarOk){
                    frutas.setApuesta(1000);                // Seteo la apuesta
                    frutas.jugar();                         // Juego
                }
                break;                                      // Sale del switch

            case 0:
                pCasino.guardarSaldoEnArchivo();            // Guardo el saldo actual
                salir = true;                               // Sale del bucle
                break;                                      // Sale del switch

            default:
                console.log("❌ Opción inválida.");       // Muestro mensaje de error
                rs.question("Presione ENTER para continuar...");  // Pido que presione Enter para continuar
                break;                                     // Sale del switch
        };
    };
};



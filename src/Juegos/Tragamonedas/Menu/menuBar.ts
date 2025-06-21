import * as rs from 'readline-sync';                        // Importo readline-sync para leer la entrada del usuario
import { Casino } from '../../../ClasePrincipal/Casino';    // Importo la clase Casino

// Funcion para mostrar el menu de Tragamonedas de Bar
// parametro pCasino - Instancia del casino para gestionar saldo y juego
export function mostrarMenuBar(pCasino:Casino) {
    let salir : boolean = false;                            // Variable para controlar el bucle
    let jugarOk : boolean = false;                          // Variable para controlar si se puede jugar

    const bar = pCasino.getTragamonedasBar();               // Instancio el Tragamonedas de Bar

    // Bucle principal para mostrar el menu de Tragamonedas de Bar
    while (!salir) {
        console.clear();                                    // Limpio la consola
        console.log("+---------------------------------------------------+");
        console.log("|     🍸 🍹 🍾   TRAGAMONEDAS DE BAR  🍾 🍷 🍺      |");
        console.log("+---------------------------------------------------+");
        bar.mostrarMatriz() ;                               // Muestro la matriz del Tragamonedas de Bar
        
        // Muestro el saldo actual y el ganado de la ultima apuesta
        console.log(`[ 💰 Saldo actual: $${pCasino.obtenerSaldo()} , Ganado ultima apuesta: $${bar.getGanado()- bar.getApuesta()} ]`);

        // Muestro los premios
        console.warn("+-----------------------------------------------------------------------+");
        console.warn("| PREMIOS: 🍸🍸🍸 = x2 | 🍹🍹🍹 x3 | 🍺🍺🍺 x4 | 🍷🍷🍷 x5 | 🍾🍾🍾 x10 | >> EN FILA CENTRAL PAGA DOBLE PREMIO <<");
        console.warn("+-----------------------------------------------------------------------+\n");

        // Muestro las opciones
        console.log("1. Apostar 10 creditos");
        console.log("2. Apostar 50 creditos");
        console.log("3. Apostar 100 creditos");
        console.log("4. Apostar 1000 creditos");
        console.log("0. Salir");
        console.log("-----------------------------------");

        // Pido la opcion al usuario
        const opcion:number = rs.questionInt("Seleccione una opcion: ");

        switch (opcion) {
            case 1:
                jugarOk = pCasino.descontarApuesta(10);       // Desconto la apuesta
                if (jugarOk){
                    bar.setApuesta(10);                       // Seteo la apuesta
                    bar.jugar();                              // Juego
                }
                break;                                        // Sale del switch

            case 2:
                jugarOk = pCasino.descontarApuesta(50);       // Desconto la apuesta
                if (jugarOk){
                    bar.setApuesta(50);                       // Seteo la apuesta
                    bar.jugar();                              // Juego
                }
                break;                                        // Sale del switch

            case 3:
                jugarOk = pCasino.descontarApuesta(100);       // Desconto la apuesta
                if (jugarOk){
                    bar.setApuesta(100);                       // Seteo la apuesta
                    bar.jugar();                               // Juego
                }
                break;                                         // Sale del switch

            case 4:
                jugarOk = pCasino.descontarApuesta(1000);      // Desconto la apuesta
                if (jugarOk){
                    bar.setApuesta(1000);                      // Seteo la apuesta
                    bar.jugar();                               // Juego
                }
                break;                                         // Sale del switch

            case 0:
                pCasino.guardarSaldoEnArchivo();               // Guardo el saldo actual
                salir = true;                                  // Sale del bucle
                break;                                         // Sale del switch

            default:                                           // Caso default: Opcion no valida, muestra mensaje de error y vuelve al menu
                console.log("❌ Opción inválida.");
                rs.question("Presione ENTER para continuar...");
                break;
        };
    };

};
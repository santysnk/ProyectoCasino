
import { Casino } from "../../ClasePrincipal/Casino";           // Importa la clase Casino
import * as rs from "readline-sync";                            // Importa la clase readline-sync para leer la entrada del usuario

//Muestra el menú principal del juego Ruleta
//parametro pCasino - Instancia del casino para gestionar saldo y juego
export function mostrarMenuRuleta (pCasino:Casino){
    let salir:boolean = false;                     //Controla el bucle del menú principal

    const ruleta = pCasino.getRuleta();            // Obtiene la instancia del juego

    // Bucle principal del menú
    while(!salir){
        console.clear();         // Limpia la consola
        console.log("+-----------------------------------------------------+");
        console.log("|          Bienvenido al juego de la Ruleta           |");           // Muestra el encabezado del juego
        console.log("+-----------------------------------------------------+");
        console.log(`[  💰 Saldo actual: $${pCasino.obtenerSaldo()} >>> Monto Apostado: $${ruleta.getMontoApostado()} <<<  ]\n`);   // Muestra el saldo actual y el monto apostado
        console.log("----------------------------------------");
        console.log(" Elija una opcion \n " )
        console.log("1. Apostar un numero");
        console.log("2. Apostar color");
        console.log("3. Apostar par o impar");
        console.log("4. Jugar");
        console.log("0. Salir");
        console.log("---------------------------------------- \n ");
        ruleta.mostrarApuestas();                                                         // Muestra las apuestas disponibles
        
        let opcion:number = rs.questionInt("Seleccione una opcion: ");                    // Solicita la opción al usuario

        // Procesa la opción seleccionada
        switch(opcion){
            
            case 1 :                                            // Caso 1: Apostar un numero
                ruleta.tomarApuestaDeNumeros();                 // Solicita la apuesta de numeros
                ruleta.setMontoApostado();                      // Setea el monto apostado
                break;                                          // Sale del switch

            case 2 :                                            // Caso 2: Apostar color
                ruleta.tomarApuestaColor();                     // Solicita la apuesta de color
                ruleta.setMontoApostado();                      // Setea el monto apostado
                break;                                          // Sale del switch

            case 3 :                                            // Caso 3: Apostar par o impar
                ruleta.tomarApuestaParidad();                   // Solicita la apuesta de paridad
                ruleta.setMontoApostado();                      // Setea el monto apostado
                break;                                          // Sale del switch

            case 4:                                             // Caso 4: Jugar
                console.log("\n......No va maaaaaaaaaaaas \n"); // Muestra mensaje de advertencia
                ruleta.jugar();                                 // Juega la ruleta
                break;                                          // Sale del switch

            case 0 :                                            // Caso 0: Salir, manda a guardar el saldo en el archivo y sale del bucle
                console.log("Gracias por visitar la ruleta, que disfrute su estadia en el Casino La Rula te seca 😄💰🍀");
                pCasino.guardarSaldoEnArchivo();
                salir = true;
                break;

            default:                                            // Caso default: Opcion no valida, muestra mensaje de error y vuelve al menu
                console.log(" Usted ha ingresado un numero incorrecto 😕 ");    
                rs.question("Presione Enter para volver al menu ");
                break;
        };
    };
};





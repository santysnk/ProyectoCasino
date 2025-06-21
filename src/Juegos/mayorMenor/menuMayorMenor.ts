// Importaciones necesarias para el módulo
import { Casino } from "../../ClasePrincipal/Casino";
import * as rs from "readline-sync";


//Muestra el menú principal del juego Mayor o Menor
//parametro pCasino - Instancia del casino para gestionar saldo y juego
export function mostrarMenuMayorMenor(pCasino: Casino) {
	
    let salir: boolean = false;  // Controla el bucle del menú principal
    const mayorMenor = pCasino.getMayorMenor();  // Obtiene la instancia del juego

    // Bucle principal del menú
    while (!salir) {
        console.clear();  // Limpia la consola y muestra el encabezado del juego
        console.log("+-----------------------------------------------------+");
        console.log("|          Bienvenido al juego de Mayor o Menor       |");  
        console.log("+-----------------------------------------------------+");
        
        // Muestra el saldo actual y el monto apostado
        console.log(`[  💰 Saldo actual: $${pCasino.obtenerSaldo()} >>> Monto Apostado: $${mayorMenor.getMontoApostado()} <<<  ]\n`);
        
        // Muestra las opciones del menú
        console.log("----------------------------------------");
        console.log(" Elija una opción: \n");
        console.log("1. Jugar con apuesta de 10 créditos");         
        console.log("2. Jugar con apuesta de 50 créditos");
        console.log("3. Jugar con apuesta de 100 créditos");
        console.log("0. Salir");
        console.log("---------------------------------------- \n");
        
        // Solicita la opción al usuario
        let opcion: number = rs.questionInt("Seleccione una opción: ");

        // Procesa la opción seleccionada por el usuario
        switch (opcion) {
            // Jugar con apuesta inicial (luz) de 10 créditos
            case 1:
                if (pCasino.descontarApuesta(10)) {
                    mayorMenor.jugar(10);
                } else {
                    console.log("Saldo insuficiente para esta apuesta.");
                    rs.question("Presione Enter para continuar...");
                }
                break;
                
            // Jugar con apuesta inicial (luz) de 50 créditos
            case 2:
                if (pCasino.descontarApuesta(50)) {
                    mayorMenor.jugar(50);
                } else {
                    console.log("Saldo insuficiente para esta apuesta.");
                    rs.question("Presione Enter para continuar...");
                }
                break;
                
            // Jugar con apuesta inicial (luz) de 100 créditos
            case 3:
                if (pCasino.descontarApuesta(100)) {
                    mayorMenor.jugar(100);
                } else {
                    console.log("Saldo insuficiente para esta apuesta.");
                    rs.question("Presione Enter para continuar...");
                }
                break;
                
            // Salir del juego
            case 0:
                console.log("Gracias por visitar el juego de Menor o Mayor, que disfrute su estadía en el Casino La Rula te seca 😄💰🍀");
                pCasino.guardarSaldoEnArchivo();  // Guarda el saldo actual
                salir = true;  // Sale del bucle del menú
                break;
                
            // Opción no válida
            default:
                console.log("Usted ha ingresado un número incorrecto 😕");
                rs.question("Presione Enter para volver al menú 🆗");
                break;
        }
    }
}



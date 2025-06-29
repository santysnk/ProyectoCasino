import { Casino } from "../../ClasePrincipal/Casino";     // Importa la clase Casino
import * as rs from "readline-sync";                      // Importa la clase readline-sync para leer la entrada del usuario


//Muestra el menú principal del juego Mayor o Menor
//parametro pCasino - Instancia del casino para gestionar saldo y juego
export function mostrarMenuMayorMenor(pCasino: Casino) {
	
    let salir: boolean = false;                          // Controla el bucle del menú principal
    const mayorMenor = pCasino.getMayorMenor();          // Obtiene la instancia del juego

    // Bucle principal del menú
    while (!salir) {
        console.clear();                                  // Limpia la consola y muestra el encabezado del juego
        console.log("+-----------------------------------------------------+");
        console.log("|          Bienvenido al juego de Mayor o Menor       |");  
        console.log("+-----------------------------------------------------+");
        
        // Muestra el saldo actual y el monto apostado
        console.log(`[  💰 Saldo actual: $${pCasino.obtenerSaldo()} >>> Monto Apostado: $${mayorMenor.getMontoApostado()} <<<  ]\n`);
        
        // Muestra las opciones del menú
        console.log("----------------------------------------");
        console.log(" Elija una opcion: \n");
        console.log("1. Jugar con apuesta de 10 créditos");         
        console.log("2. Jugar con apuesta de 50 créditos");
        console.log("3. Jugar con apuesta de 100 créditos");
        console.log("0. Salir");
        console.log("---------------------------------------- \n");
        
        // Solicita la opción al usuario
        let opcion: number = rs.questionInt("Seleccione una opcion: ");

        // Procesa la opción seleccionada por el usuario
        switch (opcion) {

            // Jugar con apuesta inicial (luz) de 10 créditos
            case 1:
                if (pCasino.descontarApuesta(10)) {                         // Si el saldo es suficiente para la apuesta
					mayorMenor.setLuz(10);                                  // Se llama al metodo setLuz con el valor de la apuesta minima
                    mayorMenor.jugar();                                     // Se llama al metodo jugar

                } else {                                                    // Si el saldo es insuficiente para la apuesta
                    console.log("Saldo insuficiente para esta apuesta.");   // Muestra mensaje de error
                    rs.question("Presione Enter para continuar...");        // Solicita al usuario que presione Enter para continuar
                };
                break;                                                      // Sale del switch
                
            // Jugar con apuesta inicial (luz) de 50 créditos
            case 2:
                if (pCasino.descontarApuesta(50)) {                         // Si el saldo es suficiente para la apuesta
					mayorMenor.setLuz(50);                                  // Se llama al metodo setLuz con el valor de la apuesta minima
                    mayorMenor.jugar();                                     // Se llama al metodo jugar  

                } else {                                                    // Si el saldo es insuficiente para la apuesta
                    console.log("Saldo insuficiente para esta apuesta.");   // Muestra mensaje de error
                    rs.question("Presione Enter para continuar...");        // Solicita al usuario que presione Enter para continuar
                };
                break;                                                      // Sale del switch
                
            // Jugar con apuesta inicial (luz) de 100 créditos
            case 3:
                if (pCasino.descontarApuesta(100)) {                        // Si el saldo es suficiente para la apuesta
					mayorMenor.setLuz(100);                                 // Se llama al metodo setLuz con el valor de la apuesta minima
                    mayorMenor.jugar();                                     // Se llama al metodo jugar  

                } else {                                                    // Si el saldo es insuficiente para la apuesta
                    console.log("Saldo insuficiente para esta apuesta.");   // Muestra mensaje de error
                    rs.question("Presione Enter para continuar...");        // Solicita al usuario que presione Enter para continuar
                };
                break;                                                      // Sale del switch
                
            // Salir del juego
            case 0:
                console.log("Gracias por visitar el juego de Menor o Mayor, que disfrute su estadía en el Casino La Rula te seca 😄💰🍀");
                pCasino.guardarSaldoEnArchivo();                            // Guarda el saldo actual
                rs.question("Presione Enter para volver al menu ");
                salir = true;                                               // Sale del bucle del menú
                break;                                                      // Sale del switch
                
            // Opción no válida
            default:                                                        // Opción por defecto: Entrada no válida
                console.log("Usted ha ingresado un numero incorrecto 😕");  // Muestra mensaje de error
                rs.question("Presione Enter para volver al menu");          // Solicita al usuario que presione Enter para continuar
                break;                                                      // Sale del switch
        };
    };
};



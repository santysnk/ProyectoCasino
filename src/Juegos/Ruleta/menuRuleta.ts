
import { Casino } from "../../ClasePrincipal/Casino";
import * as rs from "readline-sync"


export function mostrarMenuRuleta (pCasino:Casino){
    let salir:boolean = false;

    const ruleta = pCasino.getRuleta();

    while(!salir){
        console.clear();
        console.log("+-----------------------------------------------------+");
        console.log("|          Bienvenido al juego de la Ruleta           |");  
        console.log("+-----------------------------------------------------+");
        console.log(`[  💰 Saldo actual: $${pCasino.obtenerSaldo()} >>> Monto Apostado: $${ruleta.getMontoApostado()} <<<  ]\n`);
        console.log("----------------------------------------");
        console.log(" Elija una opcion \n " )
        console.log("1. Apostar un numero");
        console.log("2. Apostar color");
        console.log("3. Apostar par o impar");
        console.log("4. Jugar");
        console.log("0. Salir");
        console.log("---------------------------------------- \n ");
        ruleta.mostrarApuestas();
        let opcion:number = rs.questionInt("Seleccione una opcion: ");

        switch(opcion){
            
            case 1 :
                ruleta.tomarApuestaDeNumeros();
                ruleta.setMontoApostado();
                break
            case 2 :
                ruleta.tomarApuestaColor();
                ruleta.setMontoApostado();
                break
            case 3 :
                ruleta.tomarApuestaParidad();
                ruleta.setMontoApostado();
                break
            case 4:                
                console.log("\n......No va maaaaaaaaaaaas \n");
                ruleta.jugar();
                
                break
            case 0 :
                console.log("Gracias por visitar la ruleta, que disfrute su estadia en el Casino La Rula te seca 😄💰🍀");
                pCasino.guardarSaldoEnArchivo();
                salir = true;
                break
            default:
                console.log(" Usted ha ingresado un numero incorrecto 😕 ")
                rs.question("Presione Enter para volver al menu 🆗")
                break
        }
    }
}





import { Casino } from "../../Clases/Casino";
import * as rs from "readline-sync"


export function mostrarMenuMayorMenor (pCasino:Casino){
	
    let salir:boolean = false;

    const mayorMenor = pCasino.getMayorMenor();

    while(!salir){
        console.clear();
        console.log("+-----------------------------------------------------+");
        console.log("|          Bienvenido al juego de Mayor o Menor       |");  
        console.log("+-----------------------------------------------------+");
        console.log(`[  💰 Saldo actual: $${pCasino.obtenerSaldo()} >>> Monto Apostado: $${mayorMenor.getMontoApostado()} <<<  ]\n`);
        console.log("----------------------------------------");
        console.log(" Elija una opcion \n " )
        console.log("1. Jugar con luz de 10 creditos");
        console.log("2. Jugar con luz de 50 creditos");
        console.log("3. Jugar con luz de 100 creditos");
        console.log("0. Salir");
        console.log("---------------------------------------- \n ");
        
        let opcion:number = rs.questionInt("Seleccione una opcion: ");

        switch(opcion){
            
            case 1 :
                if(pCasino.descontarApuesta(10)){
                    mayorMenor.jugar(10)
                }
            
                break
            case 2 :
                if(pCasino.descontarApuesta(50)){
                    mayorMenor.jugar(50)
                    
                }
                break
            case 3 :
                if(pCasino.descontarApuesta(100)){
                    mayorMenor.jugar(100)
                    
                }
                break
            case 0 :
                console.log("Gracias por visitar el juego de Menor o Mayor, que disfrute su estadia en el Casino La Rula te seca 😄💰🍀");
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





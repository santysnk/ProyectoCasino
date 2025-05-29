import * as rs from 'readline-sync';
import { Casino } from '../../Clases/Casino';

export function mostrarMenuTragamonedas(pCasino:Casino) {
    let salir:boolean = false;

    // Array de símbolos posibles
    const simbolos = ["🍒", "🍋", "🍉", "🍇", "🍓"];

    while (!salir) {
        console.clear();
        console.log("+---------------------------------------------------+");
        console.log("|     🍓 🍉 🍇 TRAGAMONEDAS DE FRUTAS 🍒 🍋       |");
        console.log("+---------------------------------------------------+\n");
        console.log("+---------------------------------------------------+");
        console.log("|                                                   |");  
        console.log("|     [ 🍇 ]  [ 🍇 ]  [ 🍇 ]  [ 🍇 ][ 🍇 ]       |");  
        console.log("|     [ 🍇 ]  [ 🍇 ]  [ 🍇 ]  [ 🍇 ][ 🍇 ]       |");    
        console.log("|     [ 🍇 ]  [ 🍇 ]  [ 🍇 ]  [ 🍇 ][ 🍇 ]       |");    
        console.log("|     [ 🍇 ]  [ 🍇 ]  [ 🍇 ]  [ 🍇 ][ 🍇 ]       |");  
        console.log("|     [ 🍇 ]  [ 🍇 ]  [ 🍇 ]  [ 🍇 ][ 🍇 ]       |");  
        console.log("|                                                   |");  
        console.log("+---------------------------------------------------+\n");
        console.log(`[ 💰 Saldo actual: $${pCasino.obtenerSaldo()} ]\n`);
        console.log("-----------------------------------");
        console.log("1. Apostar 10 creditos");
        console.log("2. Apostar 50 creditos");
        console.log("3. Apostar 100 creditos");
        console.log("0. Salir");
        console.log("-----------------------------------");

        const opcion:number = rs.questionInt("Seleccione una opcion: ");

        switch (opcion) {
            case 1:

                break;

            case 2:

                break;

            case 3:

                break;

            case 0:
                console.log("👋 Gracias por visitar el casino. ¡Hasta luego!");
                pCasino.guardarSaldoEnArchivo();
                salir = true;
                break;

            default:
                console.log("❌ Opción inválida.");
                rs.question("Presione ENTER para continuar...");
                break;
        }
    }
}

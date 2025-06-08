import * as rs from 'readline-sync';

function mostrarMenuTragamonedas() {
    let salir:boolean = false;

    while (!salir) {
        console.clear();
        console.log("+--------------------------------------------------------------------------------------+");
        console.log("|     1. [ 🍇 TRAGAMONEDAS DE FRUTAS 🍒 ]      2. [ 🍸 TRAGAMONEDAS DE BAR 🍷 ]      |");              
        console.log("+--------------------------------------------------------------------------------------+\n");
        //console.log(`[ 💰 Saldo actual: $${casino.obtenerSaldo()} ]\n`);
        console.log("-----------------------------------");
        console.log("1. Jugar Tragamonedas de Frutas");
        console.log("2. Jugar Tragamonedas de Frutas");
        console.log("0. Salir");
        console.log("-----------------------------------");

        const opcion:number = rs.questionInt("Seleccione una opcion: ");

        switch (opcion) {
            case 1:

                break;

            case 2:

                break;


            case 0:
                console.log("👋 Gracias por visitar el casino. ¡Hasta luego!");
            //    casino.guardarSaldoEnArchivo();
                salir = true;
                break;

            default:
                console.log("❌ Opción inválida.");
                rs.question("Presione ENTER para continuar...");
                break;
        }
    }
}

// probando
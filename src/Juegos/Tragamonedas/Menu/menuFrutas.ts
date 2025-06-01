import * as rs from 'readline-sync';
import { Casino } from '../../Clases/Casino';


export function mostrarMenuFrutas(pCasino:Casino) {
    let salir : boolean = false;
    let jugarOk : boolean = false;

    const frutas = pCasino.getTragamonedasFrutas();

    while (!salir) {
        console.clear();
        console.log("+---------------------------------------------------+");
        console.log("|     🍓 🍉    TRAGAMONEDAS DE FRUTAS   🍒 🍋 🍇    |");
        console.log("+---------------------------------------------------+");
        frutas.mostrarMatriz() ;
        console.log(`[ 💰 Saldo actual: $${pCasino.obtenerSaldo()} , Ganado ultima apuesta: $${frutas.getGanado() - frutas.getApuesta()} ]\n`);
        console.log("-----------------------------------");
        console.log("1. Apostar 10 creditos");
        console.log("2. Apostar 50 creditos");
        console.log("3. Apostar 100 creditos");
        console.log("4. Apostar 1000 creditos");
        console.log("0. Salir");
        console.log("-----------------------------------");

        const opcion:number = rs.questionInt("Seleccione una opcion: ");

        switch (opcion) {
            case 1:
                jugarOk = pCasino.descontarApuesta(10);
                if (jugarOk){
                    frutas.setApuesta(10);
                    frutas.jugar();
                }
                break;

            case 2:
                jugarOk = pCasino.descontarApuesta(50);
                if (jugarOk){
                    frutas.setApuesta(50);
                    frutas.jugar();
                }
                break;

            case 3:
                jugarOk = pCasino.descontarApuesta(100);
                if (jugarOk){
                    frutas.setApuesta(100);
                    frutas.jugar();
                }
                break;

            case 4:
                jugarOk = pCasino.descontarApuesta(1000);
                if (jugarOk){
                    frutas.setApuesta(1000);
                    frutas.jugar();
                }
                break;

            case 0:
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



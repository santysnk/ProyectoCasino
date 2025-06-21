import * as rs from 'readline-sync';
import { Casino } from '../../../ClasePrincipal/Casino';


export function mostrarMenuBar(pCasino:Casino) {
    let salir : boolean = false;
    let jugarOk : boolean = false;

    const bar = pCasino.getTragamonedasBar();

    while (!salir) {
        console.clear();
        console.log("+---------------------------------------------------+");
        console.log("|     🍸 🍹 🍾   TRAGAMONEDAS DE BAR  🍾 🍷 🍺      |");
        console.log("+---------------------------------------------------+");
        bar.mostrarMatriz() ;
        console.log(`[ 💰 Saldo actual: $${pCasino.obtenerSaldo()} , Ganado ultima apuesta: $${bar.getGanado()- bar.getApuesta()} ]`);
        console.warn("+-----------------------------------------------------------------------+");
        console.warn("| PREMIOS: 🍸🍸🍸 = x2 | 🍹🍹🍹 x3 | 🍺🍺🍺 x4 | 🍷🍷🍷 x5 | 🍾🍾🍾 x10 | >> EN FILA CENTRAL PAGA DOBLE PREMIO <<");
        console.warn("+-----------------------------------------------------------------------+\n");
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
                    bar.setApuesta(10);
                    bar.jugar();
                }
                break;

            case 2:
                jugarOk = pCasino.descontarApuesta(50);
                if (jugarOk){
                    bar.setApuesta(50);
                    bar.jugar();
                }
                break;

            case 3:
                jugarOk = pCasino.descontarApuesta(100);
                if (jugarOk){
                    bar.setApuesta(100);
                    bar.jugar();
                }
                break;

            case 4:
                jugarOk = pCasino.descontarApuesta(1000);
                if (jugarOk){
                    bar.setApuesta(1000);
                    bar.jugar();
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
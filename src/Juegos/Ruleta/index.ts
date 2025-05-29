import { Casino } from "../../Clases/Casino";
import * as rs from "readline-sync";

class Ruleta {
    private numeroGanador:number;
    private numeroApostado:number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
    private valorApuesta:number;
    private premio:number;
    private saldo:number = 0 ; // usar saldo de casino
    private color:string[] = ["ROJO","NEGRO"];
    private parImpar:string[] = ["PAR","IMPAR"];
    

    constructor(){
        
    }
    verMenu(){
        Menu()
    }

    jugar():void {
        console.log("No va maaaaaaaaaaas")
        console.log("La ruleta esta girando .....🍀🤞")
    }
    cargarcredito(credito:number){
        this.saldo = this.saldo + credito;
        console.log("usted ha cargado $ " + credito + "y su saldo actual es de $ " + this.saldo);
    }
    verSaldo(){
        return this.saldo;
    }
    descontarApuesta(){
        this.saldo = this.saldo - this.apuesta;
    }
    pagarPremio(){
        this.saldo = this.saldo + this.premio;
    }

}

const casinoRuleta = new Ruleta();

function Menu (){
    let salir:boolean = false;

    while(!salir){
        console.log("----------------------------------------");
        console.log(" Bienvenido al juego de la Ruleta ");
        console.log("----------------------------------------");
        console.log(`[ 💰 Saldo actual: $${casinoRuleta.verSaldo()} ]\n`);
        console.log("----------------------------------------");
        console.log("Elija una opcion \n " )
        console.log("1. Cargar créditos");
        console.log("2. Apostar numero");
        console.log("3. Apostar color");
        console.log("4. Apostar par o impar");
        console.log("0. Salir");
        console.log("---------------------------------------- \n ");

        let opcion:number = rs.questionInt("Seleccione una opcion: ");

        if(opcion == 1){
            const credito = rs.questionInt("Ingrese el monto a cargar: ");
            casinoRuleta.cargarcredito(credito);            
            }else if(opcion == 2){
            const numeroApostado = rs.questionInt("Ingrese un numero del 0 al 36 para apostar: ");
                }else if(opcion == 3){
            const color = rs.questionInt("Eliga 1 para apostar el color ROJO , 2 para apostar el color NEGRO: ");            
                    }else if(opcion == 4){
                        const parImpar = rs.questionInt("Elija 1 para apostar opcion IMPAR, 2 para apostar opcion PAR: 1");
                        }else if(opcion == 0){
                            casinoRuleta.jugar()
                            
                        }
    }
}
casinoRuleta.verMenu();
// probando 123
// probando rama vani
// tercer prueba
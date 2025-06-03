import { Casino } from "../../Clases/Casino";
import * as rs from "readline-sync";
import { IJuego } from "../InterfaceJuego";
import { Random } from "random-js";


export class Ruleta implements IJuego{
    private casino:Casino;      
    private panio: { [clave: string]:{ paridad: `par` | `impar`| `ninguno` , color: `rojo` | `negro` | `ninguno`}}
    private apuestas: { Apuesta: string ; Monto : number } [];
    private numeroGanador:string;
    private colorGanador:string;
    private paridadGanadora:string;
    private montoApostado:number;
    private ganancia:number;

    constructor(pCasino:Casino){
        this.casino = pCasino;
        this.apuestas = [];
        this.numeroGanador = "";
        this.colorGanador = "";
        this.paridadGanadora = "";
        this.montoApostado = 0;
        this.ganancia = 0;
        this.panio = {
            "00": { paridad: "ninguno", color: "ninguno" },
            "0":  { paridad: "ninguno", color: "ninguno" },
            "1":  { paridad: "impar", color: "rojo" },
            "2":  { paridad: "par", color: "negro" },
            "3":  { paridad: "impar", color: "rojo" },
            "4":  { paridad: "par", color: "negro" },
            "5":  { paridad: "impar", color: "rojo" },
            "6":  { paridad: "par", color: "negro" },
            "7":  { paridad: "impar", color: "rojo" },
            "8":  { paridad: "par", color: "negro" },
            "9":  { paridad: "impar", color: "rojo" },
            "10": { paridad: "par", color: "negro" },
            "11": { paridad: "impar", color: "negro" },
            "12": { paridad: "par", color: "rojo" },
            "13": { paridad: "impar", color: "negro" },
            "14": { paridad: "par", color: "rojo" },
            "15": { paridad: "impar", color: "negro" },
            "16": { paridad: "par", color: "rojo" },
            "17": { paridad: "impar", color: "negro" },
            "18": { paridad: "par", color: "rojo" },
            "19": { paridad: "impar", color: "rojo" },
            "20": { paridad: "par", color: "negro" },
            "21": { paridad: "impar", color: "rojo" },
            "22": { paridad: "par", color: "negro" },
            "23": { paridad: "impar", color: "rojo" },
            "24": { paridad: "par", color: "negro" },
            "25": { paridad: "impar", color: "rojo" },
            "26": { paridad: "par", color: "negro" },
            "27": { paridad: "impar", color: "rojo" },
            "28": { paridad: "par", color: "negro" },
            "29": { paridad: "impar", color: "negro" },
            "30": { paridad: "par", color: "rojo" },
            "31": { paridad: "impar", color: "negro" },
            "32": { paridad: "par", color: "rojo" },
            "33": { paridad: "impar", color: "negro" },
            "34": { paridad: "par", color: "rojo" },
            "35": { paridad: "impar", color: "negro" },
            "36": { paridad: "par", color: "rojo" }
        };
    }


    girarRuleta():string{
        const bolilla = new Random();
        let acierto = bolilla.pick([
            "00", "0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
            "18", "19", "20", "21", "22", "23", "24", "25", "26", "27",
            "28", "29", "30", "31", "32", "33", "34", "35", "36"
        ]);
        return acierto;
    }

    jugar(){
        this.numeroGanador = this.girarRuleta();        

        //buscar paridad y color en el paño
        let {paridad,color} = this.panio[this.numeroGanador];

        //guardar en variables
        this.paridadGanadora = paridad;
        this.colorGanador = color;
        console.log(`###########################################################`);
        console.log(`   El numero ganador es el: >> ${this.numeroGanador} << `);
        console.log(`   Color:   >> ${this.colorGanador.toUpperCase()} << `);
        console.log(`   Paridad: >> ${this.paridadGanadora.toUpperCase()} << `);
        console.log(`###########################################################`);
        
        rs.question("\nPresione ENTER para continuar...\n");

        if(this.apuestas.length > 0 ){
            this.ganancia = this.calcularPremio()
            if (this.ganancia > 0){
                console.log(`+-------------------------------------------------------+`);
                console.log(`|  Felicidades!!! monto apostado $${this.montoApostado}, a ganado: $${this.ganancia}   |`);
                console.log(`+-------------------------------------------------------+`);
                
                this.pagarPremio(this.ganancia);
                rs.question("\nPresione ENTER para continuar...");
                this.apuestas = []
            }else{
                console.log(`Sin suerte :( has perdido: $ ${this.montoApostado} `);
                rs.question("\nPresione ENTER para continuar...");
                this.apuestas = []
            }
            this.montoApostado = 0;
        }
    }

    pagarPremio(pPremio:number):void{
        this.casino.cargarCreditos(pPremio)
    }

    getMontoApostado():number{
        return this.montoApostado
    }

    setApuesta(pApuesta: number): void {
        this.montoApostado += pApuesta;
    }

    setMontoApostado():void{
        this.montoApostado = 0;    //reinicio el monto apostado para acumular el monto de cada apuesta

        if(this.apuestas.length > 0 ){
            for(let i = 0;i < this.apuestas.length; i++){
                this.setApuesta(this.apuestas[i].Monto);
            }
        }
    }

    calcularPremio(): number {
        let pagar: number = 0;

        for (let i = 0; i < this.apuestas.length; i++) {
            const auxApuesta = this.apuestas[i];

            if (this.numeroGanador === auxApuesta.Apuesta) {
                pagar += auxApuesta.Monto * 36; // acierta número
            }

            if (this.colorGanador === auxApuesta.Apuesta.toLowerCase()) {
                pagar += auxApuesta.Monto * 2; // acierta color
            }

            if (this.paridadGanadora === auxApuesta.Apuesta.toLowerCase()) {
                pagar += auxApuesta.Monto * 2; // acierta paridad
            }
        }
        return pagar;
    }

    validarApuesta(pApuesta : number) : void {
        this.casino.descontarApuesta(pApuesta);
    }

    agregarApuesta(elementoApostado: string, montoApostado: number) {
        const aux = {
            Apuesta: elementoApostado,
            Monto: montoApostado
        };

        this.apuestas.push(aux);
    }       

    tomarApuestaDeNumeros(){
        let numeroElegido:string = "";

        console.log("+-------------------------------------------------------------------------------+");
        console.log("|   [00]  [3]  [6]  [9]  [12]  [15]  [18]  [21]  [24]  [27]  [30]  [33]  [36]   |");
        console.log("|         [2]  [5]  [8]  [11]  [14]  [17]  [20]  [23]  [26]  [29]  [32]  [35]   |");
        console.log("|   [0]   [1]  [4]  [7]  [10]  [13]  [16]  [19]  [22]  [25]  [28]  [31]  [34]   |");
        console.log("+-------------------------------------------------------------------------------+");

        let salir:boolean = false

        while (salir === false) {
            numeroElegido = rs.question("A que numero desea jugar?: ");

            if (numeroElegido in this.panio){ 
                salir = true  // nuemero esta en el panio
            }else{
                console.warn ("❌  Numero incorrecto, Ingrese un numero que este en el panio.")
            }
        };

        const monto = rs.questionInt("Ingrese creditos a apostar: ");

        if (monto <=0){
            console.warn ("❌ Monto incorrecto, ingrese un valor mayor a 0.")
        }else {
            if (this.casino.descontarApuesta(monto) === true){
                this.agregarApuesta(numeroElegido,monto)
            }else{
                console.log("⚠  apuesta cancelada");
                rs.question("Presione ENTER para volver al menu...");
            };
        }
    }    

    tomarApuestaColor(){
        let colorElegido : string = "";
        let salir  :boolean = false;

        while(salir === false){
            let aux:string = rs.question("Ingrese ROJO o NEGRO: ");
            colorElegido = aux.toLowerCase();

            if(colorElegido.toLowerCase() === "rojo"){
                console.log("\n[ Usted ha apostado al color Rojo ] \n");
                salir = true;
            }else if(colorElegido.toLowerCase() === "negro"){
                console.log("\n[ Usted ha apostado al color Negro ] \n");
                salir = true;
            }else{
                console.log("El dato ingresado es incorrecto, ingrese Rojo o Negro");
            }               
        } 
        const monto = rs.questionInt("Ingrese creditos a apostar: ");

        if (monto <=0){
            console.log ("❌ Monto incorrecto, ingrese un valor mayor a 0.")
        }else {
            if (this.casino.descontarApuesta(monto) === true){
                this.agregarApuesta(colorElegido,monto)
            }else{
                console.log("⚠  apuesta cancelada");
                rs.question("Presione ENTER para volver al menu...");
            };
        }
    }

    tomarApuestaParidad(){
        let paridadElegida : string = "";
        let salir  :boolean = false;

        while(salir === false){
            let aux:string = rs.question("Ingrese PAR o IMPAR : ");
            paridadElegida = aux.toLowerCase();

            if(paridadElegida.toLowerCase() === "par"){
                console.log("\n[ Usted ha apostado la opcion PAR ] \n");
                salir = true;
            }else if(paridadElegida.toLowerCase() === "impar"){
                console.log("\n[ Usted ha apostado la opcion IMPAR ] \n");
                salir = true;
            }else{
                console.log("El dato ingresado es incorrecto, ingrese Par o Impar");
            }               
        } 
        const monto = rs.questionInt("Ingrese creditos a apostar: ");

        if (monto <=0){
            console.log ("❌ Monto incorrecto, ingrese un valor mayor a 0.");
        }else {
            if (this.casino.descontarApuesta(monto) === true){
                this.agregarApuesta(paridadElegida,monto);
            }else{
                console.log("⚠  apuesta cancelada");
                rs.question("Presione ENTER para volver al menu...");
            }
        }
    }   

    mostrarApuestas(){
        if (this.apuestas.length > 0){
            console.table(this.apuestas)
        }
    }
}

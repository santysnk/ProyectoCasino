import { Casino } from "../../Clases/Casino";
import * as rs from "readline-sync";//instale biblioteca readline-sync para ingresar las apuestas del usuario y los montos respectivamente
import { IJuego } from "../InterfaceJuego";
import { Random } from "random-js";//instale biblioteca random-js para recibir  elemento aleatorio que me dara el numero ganador cuando gire la ruleta


export class Ruleta implements IJuego{
    private casino:Casino;      
    private panio: { [clave: string]:{ paridad: `par` | `impar`| `ninguno` , color: `rojo` | `negro` | `ninguno`}} //objeto literal que tiene una calve con valores definidos (paridad y color)
    private apuestas: { Apuesta: string ; Monto : number } []; // objeto literal de tipo arreglo para almacenar cada apuesta con su monto respectivo
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
        const bolilla = new Random(); //uso la biblioteca random-js y creo una nueva instancia bolilla para usar el metodo.pick y que girarRuleta me devuelva un elemento de los que le di de forma aleatoria
        let acierto = bolilla.pick([
            "00", "0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
            "18", "19", "20", "21", "22", "23", "24", "25", "26", "27",
            "28", "29", "30", "31", "32", "33", "34", "35", "36"
        ]);
        return acierto;
    }

    jugar(){
        this.numeroGanador = this.girarRuleta();    //lamo al metodo girarRuleta que me retorna un elemento "ganador"

        //busco paridad y color en el paño
        let {paridad,color} = this.panio[this.numeroGanador]; // uso ese elemento "ganador" para buscar la paridad y el color correspondiente a la clave que salio al girarRuleta()

        //lo guardo en variables
        this.paridadGanadora = paridad;
        this.colorGanador = color;
        console.log(`###########################################################`);
        console.log(`   El numero ganador es el: >> ${this.numeroGanador} << `);
        console.log(`   Color:   >> ${this.colorGanador.toUpperCase()} << `);
        console.log(`   Paridad: >> ${this.paridadGanadora.toUpperCase()} << `);
        console.log(`###########################################################`);
        
        rs.question("\nPresione ENTER para continuar...\n");//uso a modo de pausa para que el usuario pueda leer la jugada ganadora

        if(this.apuestas.length > 0 ){//si existe la apuesta se calcula el premio y se guarda en la variable ganancia 
            this.ganancia = this.calcularPremio()
            if (this.ganancia > 0){
                console.log(`+-------------------------------------------------------+`);
                console.log(`|  Felicidades!!! monto apostado $${this.montoApostado}, a ganado: $${this.ganancia}   |`);
                console.log(`+-------------------------------------------------------+`);
                
                this.pagarPremio(this.ganancia);
                rs.question("\nPresione ENTER para continuar...");
                this.apuestas = []//reasigno el valor de apuestas a arreglo vacio para una nueva jugada
            }else{
                console.log(`Sin suerte :( has perdido: $ ${this.montoApostado} `);
                rs.question("\nPresione ENTER para continuar...");
                this.apuestas = []//reasigno el valor de apuestas a arreglo vacio para una nueva jugada
            }
            this.montoApostado = 0;//reasigno el valor de monto apostado a cero para una nueva jugada
        }
    }

    pagarPremio(pPremio:number):void{//recibo la ganancia y lo cargo en forma de credito al saldo del usuario cuando llamo al metodo cargarCredito()
        this.casino.cargarCreditos(pPremio)
    }

    getMontoApostado():number{//uso el get para llamar al metodo(privado) en el menu ruleta y asi mostrar el monto que aposto el usuario
        return this.montoApostado
    }

    setApuesta(pApuesta: number): void {//uso un acumulador para sumar el monto de cada apuesta
        this.montoApostado += pApuesta;
    }

    setMontoApostado():void{
        this.montoApostado = 0;    //reinicio el monto apostado para acumular el monto de cada apuesta

        if(this.apuestas.length > 0 ){
            for(let i = 0;i < this.apuestas.length; i++){
                this.setApuesta(this.apuestas[i].Monto);//si hay apuesta recorro el arreglo apuestas y tomo el monto de cada apuesta para acumularlas con el metodo setApuesta()
            }
        }
    }

    calcularPremio(): number {
        let pagar: number = 0;//creo la variable pagar para usarla como acumulador 

        for (let i = 0; i < this.apuestas.length; i++) {
            const auxApuesta = this.apuestas[i];// uso un auxiliar que me va a servir para traerme el monto de cada apuesta y multiplicarlo por el valor que le quiero dar al premio

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

   // validarApuesta(pApuesta : number) : void {
       // this.casino.descontarApuesta(pApuesta);
   // }

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

    mostrarApuestas(){//muestro en forma de tabla cada una de las apuestas
        if (this.apuestas.length > 0){
            console.table(this.apuestas)
        }
    }
}

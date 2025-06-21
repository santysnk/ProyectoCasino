import { Casino } from "../../ClasePrincipal/Casino";    // Importo la clase Casino
import * as rs from "readline-sync";                     // Importo la clase readline-sync para leer la entrada del usuario
import { IJuego } from "../InterfaceJuego";              // Importo la interface IJuego
import { Random } from "random-js";                      // Importo la biblioteca random-js para recibir un elemento aleatorio que me dara el numero ganador cuando gire la ruleta


export class Ruleta implements IJuego{
    private casino:Casino;                               // Creo la variable casino de tipo Casino

    // objeto literal que tiene una clave con valores definidos (paridad y color)
    private panio: { [clave: string] : { paridad: `par` | `impar`| `ninguno` , color: `rojo` | `negro` | `ninguno`} }; 

    // Objeto literal de tipo arreglo para almacenar cada apuesta con su monto respectivo
    private apuestas: { Apuesta: string ; Monto : number } []; 

    // variables para almacenar el numero ganador, color ganador y paridad ganadora
    private numeroGanador:string;
    private colorGanador:string;
    private paridadGanadora:string;
    private montoApostado:number;
    private ganancia:number;    

    // constructor que recibe un parametro de tipo Casino
    constructor(pCasino:Casino){
        this.casino = pCasino;                             // Inicializo la variable casino con el valor del parametro pCasino
        this.apuestas = [];                                // Inicializo la variable apuestas con un arreglo vacio
        this.numeroGanador = "";                           // Inicializo la variable numeroGanador con un string vacio
        this.colorGanador = "";                            // Inicializo la variable colorGanador con un string vacio
        this.paridadGanadora = "";                         // Inicializo la variable paridadGanadora con un string vacio
        this.montoApostado = 0;                            // Inicializo la variable montoApostado con un numero 0
        this.ganancia = 0;                                 // Inicializo la variable ganancia con un numero 0

        // Inicializo la variable panio como un objeto literal que tiene una clave con valores definidos (paridad y color)
        // Corresponde a la tabla del panio de una ruleta americana
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
    };

    // metodo que retorna un elemento de forma aleatoria
    girarRuleta():string{
        // Uso la biblioteca random-js y creo una nueva instancia en la constante bolilla para usar el metodo .pick 
        // que me devuelve un elemento aleatorio de un arreglo (con los numeros en formato string del 0 al 36) que le paso como parametro
        const bolilla = new Random(); 

        let acierto = bolilla.pick([
            "00", "0", "1", "2", "3", "4", "5", "6", "7",
            "8", "9", "10", "11", "12", "13", "14", "15", "16", "17",
            "18", "19", "20", "21", "22", "23", "24", "25", "26", "27",
            "28", "29", "30", "31", "32", "33", "34", "35", "36"
        ]);
        return acierto;          // Retorno el elemento aleatorio
    };

    // Metodo que recibe un numero y retorna el premio correspondiente
    jugar():void{
        this.numeroGanador = this.girarRuleta();    // Llamo al metodo girarRuleta que me retorna un elemento "ganador"

        // Busco paridad y color en el paño
        let {paridad,color} = this.panio[this.numeroGanador];    // Uso el "numeroGanador" para buscar la paridad y el color correspondiente a la clave que salio al girarRuleta()

        // Guardo en variables
        this.paridadGanadora = paridad;
        this.colorGanador = color;

        // Muestro la jugada ganadora
        console.log(`###########################################################`);
        console.log(`   El numero ganador es el: >> ${this.numeroGanador} << `);
        console.log(`   Color:   >> ${this.colorGanador.toUpperCase()} << `);
        console.log(`   Paridad: >> ${this.paridadGanadora.toUpperCase()} << `);
        console.log(`###########################################################`);
        
        rs.question("\nPresione ENTER para continuar...\n");      // Uso a modo de pausa para que el usuario pueda leer la jugada ganadora

        // Si existe la apuesta, se calcula el premio y se guarda en la variable ganancia 
        if(this.apuestas.length > 0){                            
            this.ganancia = this.calcularPremio();               // Llamo al metodo calcularPremio que me retorna el premio correspondiente
            if (this.ganancia > 0){                              // Si el premio es mayor a 0, se muestra el premio

                console.log(`+-------------------------------------------------------+`);
                console.log(`|  Felicidades!!! monto apostado $${this.montoApostado}, a ganado: $${this.ganancia}   |`);
                console.log(`+-------------------------------------------------------+`);

                this.pagarPremio(this.ganancia);                 // Llamo al metodo pagarPremio que me paga el premio
                rs.question("\nPresione ENTER para continuar...");
                this.apuestas = [];        // Reasigno el valor de apuestas a arreglo vacio para una nueva jugada

            }else{            // Si el premio es menor a 0, se mensaje que se perdio

                console.log(`+-------------------------------------------------------+`);
                console.log(`|  Sin suerte :( has perdido: $ ${this.montoApostado}  |`);
                console.log(`+-------------------------------------------------------+`);
                rs.question("\nPresione ENTER para continuar...");

                this.apuestas = [];        // Reasigno el valor de apuestas a arreglo vacio para una nueva jugada
            };

            this.montoApostado = 0;       // Reasigno el valor de monto apostado a cero para una nueva jugada
        };
    };

    // Recibo la ganancia y lo cargo en forma de credito al saldo del usuario cuando llamo al metodo casino.cargarCreditos()
    pagarPremio(pPremio:number):void{
        this.casino.cargarCreditos(pPremio);
    };

    // Metodo para mostrar el monto que aposto el usuario en el menu ruleta
    getMontoApostado():number{
        return this.montoApostado;
    };

    // Metodo para acumular el monto de cada apuesta    
    setApuesta(pApuesta: number): void {
        this.montoApostado += pApuesta;
    };

    // Metodo para reiniciar el monto apostado y acumular el monto de cada apuesta
    setMontoApostado():void{
        this.montoApostado = 0;                                // Reinicio el monto apostado para acumular el monto de cada apuesta

        if(this.apuestas.length > 0 ){                         // Si hay apuestas
            for(let i = 0;i < this.apuestas.length; i++){
                this.setApuesta(this.apuestas[i].Monto);       // Recorro el arreglo apuestas y tomo el monto de cada apuesta para acumularlas con el metodo setApuesta()
            };
        };
    };

    // Metodo para calcular el premio
    calcularPremio():number {
        let pagar: number = 0;                                                   // Creo la variable pagar para usarla como acumulador 

        for (let i = 0; i < this.apuestas.length; i++) {                         // Recorro el arreglo apuestas
            const auxApuesta = this.apuestas[i];                                 // Uso un auxiliar que me va a servir para comparar cada apuesta

            if (this.numeroGanador === auxApuesta.Apuesta) {                     // Si el numero ganador es igual al numero apostado
                pagar += auxApuesta.Monto * 36;                                  // multiplico el monto de la apuesta por 36
            };

            if (this.colorGanador === auxApuesta.Apuesta.toLowerCase()) {        // Si el color ganador es igual al color apostado
                pagar += auxApuesta.Monto * 2;                                   // multiplico el monto de la apuesta por 2
            };

            if (this.paridadGanadora === auxApuesta.Apuesta.toLowerCase()) {     // Si la paridad ganadora es igual a la paridad apostada
                pagar += auxApuesta.Monto * 2;                                   // multiplico el monto de la apuesta por 2
            };
        };
        
        return pagar;                                                            // Retorno el premio
    };

    // Metodo para agregar apuestas
    agregarApuesta(elementoApostado: string, montoApostado: number):void{

        // Creo un objeto auxiliar que me va a servir para agregar las apuestas al arreglo apuestas
        const aux = {
            Apuesta: elementoApostado,
            Monto: montoApostado
        };

        this.apuestas.push(aux);      // Agrego la apuesta al arreglo apuestas
    };       

    // Metodo para tomar apuesta de numeros
    tomarApuestaDeNumeros():void{
        let salir:boolean = false;                                        // Creo la variable salir para usarla como bandera
        let numeroElegido:string = "";                                    // Creo la variable numeroElegido para usarla como auxiliar

        // Muestro el panio
        console.log("+-------------------------------------------------------------------------------+");
        console.log("|   [00]  [3]  [6]  [9]  [12]  [15]  [18]  [21]  [24]  [27]  [30]  [33]  [36]   |");
        console.log("|         [2]  [5]  [8]  [11]  [14]  [17]  [20]  [23]  [26]  [29]  [32]  [35]   |");
        console.log("|   [0]   [1]  [4]  [7]  [10]  [13]  [16]  [19]  [22]  [25]  [28]  [31]  [34]   |");
        console.log("+-------------------------------------------------------------------------------+");

        // Entrada de numero de la ruleta
        while (salir === false) {                                         // Mientras que la variable salir sea false
            numeroElegido = rs.question("A que numero desea jugar?: ");   // Solicito el numero al usuario

            if (numeroElegido in this.panio){                             // Si el numero elegido esta en el panio
                salir = true;                                             // Sale del bucle

            }else{                                                        // Si el numero elegido no esta en el panio muestra el mensaje por consola
                console.warn ("❌  Numero incorrecto, Ingrese un numero que este en el panio.");
            };
        };


        // Entrada de monto de la apuesta
        const monto = rs.questionInt("Ingrese creditos a apostar: ");     // Solicito el monto al usuario

        if (monto <=0){                                                   // Si el monto es menor o igual a 0 muestra el mensaje por consola
            console.warn ("❌ Monto incorrecto, ingrese un valor mayor a 0.");
            
        }else {                                                     
            if (this.casino.descontarApuesta(monto) === true){           // Compruebo si el saldo disponible es mayor o igual al monto
                this.agregarApuesta(numeroElegido,monto);                // Si el saldo es mayor o igual al monto, agrega la apuesta
            }else{                                                       // Si el saldo es menor al monto, 
                console.log("⚠  apuesta cancelada");                    // Muestra el mensaje por consola
                rs.question("Presione ENTER para volver al menu...");    // Pauso el programa para que el usuario pueda leer el mensaje
            };
        };
    };    


    // Metodo para tomar apuesta de color
    tomarApuestaColor():void{
        let salir  :boolean = false;                                           // Creo la variable salir para usarla como bandera

        // Entrada de color de la ruleta
        let colorElegido : string = "";                                        // Creo la variable colorElegido para usarla como auxiliar

        while(salir === false){                                                // Mientras que la variable salir sea false
            let aux:string = rs.question("Ingrese ROJO o NEGRO: ");            // Solicito el color al usuario
            colorElegido = aux.toLowerCase();                                  // Guardo el color elegido en la variable colorElegido en minusculas

            if(colorElegido.toLowerCase() === "rojo"){                         // Si el color elegido es rojo muestra el mensaje por consola
                console.log("\n[ Usted ha apostado al color Rojo ] \n");
                salir = true;                                                  // Sale del bucle
            }else if(colorElegido.toLowerCase() === "negro"){                  // Si el color elegido es negro muestra el mensaje por consola
                console.log("\n[ Usted ha apostado al color Negro ] \n");
                salir = true;                                                  // Sale del bucle
            }else{                                                             // Si el color elegido no es rojo o negro muestra el mensaje por consola
                console.log("El dato ingresado es incorrecto, ingrese Rojo o Negro");
            };               
        };     

        // Entrada de monto de la apuesta
        const monto = rs.questionInt("Ingrese creditos a apostar: ");          // Entrada de monto de la apuesta

        if (monto <=0){                                                        // Si el monto es menor o igual a 0 muestra el mensaje por consola
            console.log ("❌ Monto incorrecto, ingrese un valor mayor a 0.")
        }else {
            if (this.casino.descontarApuesta(monto) === true){                 // Compruebo si el saldo disponible es mayor o igual al monto
                this.agregarApuesta(colorElegido,monto);                       // Si el saldo es mayor o igual al monto, agrega la apuesta

            }else{                                                             // Si el saldo es menor al monto, 
                console.log("⚠  apuesta cancelada");                          // Muestra el mensaje por consola
                rs.question("Presione ENTER para volver al menu...");          // Pauso el programa para que el usuario pueda leer el mensaje
            };
        };
    };


    // Metodo para tomar apuesta de paridad
    tomarApuestaParidad():void{
        let salir  :boolean = false;                                            // Creo la variable salir para usarla como bandera

        // Entrada de paridad de la ruleta
        let paridadElegida : string = "";                                       // Creo la variable paridadElegida para usarla como auxiliar
        
        while(salir === false){                                                 // Mientras que la variable salir sea false
            let aux:string = rs.question("Ingrese PAR o IMPAR : ");             // Solicito la paridad al usuario
            paridadElegida = aux.toLowerCase();                                 // Guardo la paridad elegida en la variable paridadElegida en minusculas

            if(paridadElegida.toLowerCase() === "par"){                         // Si la paridad elegida es par 
                console.log("\n[ Usted ha apostado la opcion PAR ] \n");        // Muestro el mensaje por consola
                salir = true;                                                   // Sale del bucle

            }else if(paridadElegida.toLowerCase() === "impar"){                 // Si la paridad elegida es impar 
                console.log("\n[ Usted ha apostado la opcion IMPAR ] \n");      // Muestro el mensaje por consola
                salir = true;                                                   // Sale del bucle

            }else{                                                              // Si la paridad elegida no es par o impar 
                console.log("El dato ingresado es incorrecto, ingrese Par o Impar");  // Muestro el mensaje por consola
            };               
        };
        
        // Entrada de monto de la apuesta
        const monto = rs.questionInt("Ingrese creditos a apostar: ");            // Solicito el monto al usuario

        if (monto <=0){                                                          // Si el monto es menor o igual a 0,
            console.log ("❌ Monto incorrecto, ingrese un valor mayor a 0.");    // Muestro el mensaje por consola

        }else {                                                                  // Si el monto es mayor a 0
            if (this.casino.descontarApuesta(monto) === true){                   // Compruebo si el saldo disponible es mayor o igual al monto
                this.agregarApuesta(paridadElegida,monto);                       // Si el saldo es mayor o igual al monto, agrega la apuesta

            }else{                                                               // Si el saldo es menor al monto,
                console.log("⚠  apuesta cancelada");                            // Muestro el mensaje por consola
                rs.question("Presione ENTER para volver al menu...");            // Pauso el programa para que el usuario pueda leer el mensaje
            };
        };
    };

    // Metodo para mostrar las apuestas
    mostrarApuestas():void{
        if (this.apuestas.length > 0){      // Si el arreglo de apuestas tiene elementos,
            console.table(this.apuestas);   // Muestro el arreglo de apuestas en forma de tabla
        };
    };

};

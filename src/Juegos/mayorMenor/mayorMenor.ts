import * as rs from "readline-sync";
import { Random } from "random-js";
import { Casino } from "../../ClasePrincipal/Casino";
import { IJuego } from "../InterfaceJuego";

// Clase que implementa el juego Mayor o Menor
// El jugador apuesta si la próxima carta será mayor o menor que la actual
export class mayorMenor implements IJuego{
    private casino:Casino;  // Instancia del casino para gestionar el saldo
    private mazoDeCartas:Array<{nombre:string, palo:string, valor:number}>;  // Mazo de cartas del juego
    
    private luz:number;  // Monto total apostado en la ronda actual
    private verCartaCasino:boolean;  // Controla si se debe mostrar la carta del casino
    private cartaUsuario:{nombre:string, palo:string, valor:number};  // Carta actual del usuario
    private cartaCasino:{nombre:string, palo:string, valor:number};  // Carta actual del casino

    // Inicializa el juego con una referencia al casino
    constructor(pCasino:Casino){
        this.casino = pCasino;
        this.mazoDeCartas = [];
        this.construirMazo();  // Construye el mazo de cartas al iniciar
        this.luz = 0;  // Inicializa la apuesta en 0
        this.verCartaCasino = false;  // Oculta la carta del casino inicialmente
        this.cartaUsuario = {nombre: "", palo: "", valor: 0};  // Inicializa carta del usuario
        this.cartaCasino = {nombre: "", palo: "", valor: 0};  // Inicializa carta del casino
    }

    // Construye el mazo de cartas con los 4 palos y 13 valores cada uno
    construirMazo(){
        // Itera sobre los 4 palos de la baraja
        for(let p:number = 0; p < 4; p++){
            let auxPalo:string = "";
            // Asigna el símbolo del palo según el índice
            if(p === 0){
                auxPalo = "♦️";  // Diamantes
            }else if(p === 1){
                auxPalo = "♣️";  // Tréboles
            }else if(p === 2){
                auxPalo = "♥️";  // Corazones
            }else{
                auxPalo = "♠️";  // Picas
            }
			
            for(let c:number = 1; c <= 13; c++){
                let auxCarta = {
					nombre: c === 1 ? "A " : c === 10 ? "10" : c === 11 ? "J " : c === 12 ? "Q " : c === 13 ? "K " : c.toString() + " ",
                    palo : auxPalo,
                    valor : c
                }
                this.mazoDeCartas.push(auxCarta)
            }
        }
    }

    mostrarMazo(){
        console.log(this.mazoDeCartas);
        rs.question("presione ENTER para continuar");
        
    }

    getMontoApostado(){
        return this.luz
    }

    // Inicia una nueva ronda del juego
    // parametro pLuz - Monto inicial a apostar
    jugar(pLuz:number){
        this.cartaUsuario = this.obtenerCartaRandom();  // Reparte carta al usuario
        this.cartaCasino = this.obtenerCartaRandom();  // Reparte carta al casino
        this.luz += pLuz;  // Actualiza el monto apostado
        this.mostrarSubMenu();  // Muestra el menú de juego
    }

    // retorna Una carta aleatoria del mazo
    obtenerCartaRandom(): {nombre: string, palo: string, valor: number} {
        const claseRandom = new Random(); 
        let cartaElegida = claseRandom.pick(this.mazoDeCartas);
        return cartaElegida;
    }


	mostrarSubMenu(){
        let salir:boolean = false;

		console.clear();
		this.mostrarCartasConsola()
		console.log("---------------------------------------------------------");
		console.log(`[  💰 Saldo actual: $${this.casino.obtenerSaldo()} >>> Monto Apostado: $${this.getMontoApostado()} <<<  ]\n`);
		console.log("1. Ver Carta sin subir apuesta");
		console.log("2. Subir apuesta");
		console.log("0. Salir");
		console.log("");

		let opcion:number = rs.questionInt("Seleccione una opcion: ");
		
		switch(opcion){
			
			case 1 :
				this.setApuesta(this.luz);
                break
			case 2 :
                let validar =false;
                while(!validar){
                    let apuesta:number = rs.questionInt("Ingrese la cantidad a apostar: ");
                
                    if(this.casino.descontarApuesta(apuesta) && apuesta >= 0){
                        apuesta += this.luz;
                        this.setApuesta(apuesta);
                        this.mostrarCartasConsola();
                        validar = true;
                    }else{
                        console.log("\nEl monto ingresado es incorrecto.");
                        
                    }
                }
				break
			case 3 :
				this.mostrarMazo();
				break
			case 0 :
				console.log("Gracias por visitar el juego de Menor o Mayor, que disfrute su estadia en el Casino La Rula te seca 😄💰🍀");
				
				salir = true;
				break
			default:
				console.log(" Usted ha ingresado un numero incorrecto 😕 ")
				rs.question("Presione Enter para volver al menu 🆗")
				break
		}
	}

    // Evalúa el resultado de la apuesta y paga el premio correspondiente
    // parametro pApuesta - Monto total apostado en la ronda
    setApuesta(pApuesta: number): void {
        this.verCartaCasino = true;  // Muestra la carta del casino
        this.mostrarCartasConsola();  // Actualiza la visualización

        if(this.cartaUsuario.valor > this.cartaCasino.valor) {
            // El usuario gana: paga el doble de lo apostado
            console.log(`Ganaste!!!! Total Ganado: $${pApuesta}`);
            this.pagarPremio(pApuesta * 2);
        } else if(this.cartaUsuario.valor === this.cartaCasino.valor) {
            // Empate: devuelve la apuesta
            console.log(`Saliste hecho..... apuesta recuperada: $${pApuesta}`);
            this.pagarPremio(pApuesta);
        } else {
            // El usuario pierde: no paga premio
            console.log(`😢 Sin suerte.... has perdido $${pApuesta}`);
            this.pagarPremio(0);
        }
        console.log();
        rs.question("presione ENTER para continuar");
            

    };

	mostrarCartasConsola(){
		console.clear();
		if(!this.verCartaCasino){
		console.log(`
+------------------------------------------------+
|                                                |
|       CARTA USUARIO                            |
|       +-----------+                            |
|       | ${this.cartaUsuario.nombre}        |                            |
|       |           |                            |
|       |    ${this.cartaUsuario.palo}      |                            |
|       |           |                            |
|       |        ${this.cartaUsuario.nombre} |                            |
|       +-----------+                            |
|                                                |
+------------------------------------------------+
		`);
		}else{
			console.log(`
+------------------------------------------------+
|                                                |
|       CARTA USUARIO       CARTA CASINO         |
|       +-----------+       +-----------+        |
|       | ${this.cartaUsuario.nombre}        |       | ${this.cartaCasino.nombre}        |        |
|       |           |       |           |        |
|       |    ${this.cartaUsuario.palo}      |       |    ${this.cartaCasino.palo}      |        |
|       |           |       |           |        |
|       |        ${this.cartaUsuario.nombre} |       |        ${this.cartaCasino.nombre} |        |
|       +-----------+       +-----------+        |
|                                                |
+------------------------------------------------+
		`);
		}


	}
    
    
    // Acredita el premio al jugador y reinicia el estado de la ronda
    // parametro pPremio - Monto a acreditar al jugador
    pagarPremio(pPremio: number): void {
        this.casino.cargarCreditos(pPremio);  // Acredita el premio
        this.verCartaCasino = false;  // Oculta la carta del casino
        this.luz = 0;  // Reinicia la apuesta
    };
}

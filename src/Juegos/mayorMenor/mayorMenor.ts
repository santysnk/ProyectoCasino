import * as rs from "readline-sync";
import { Random } from "random-js";
import { Casino } from "../../ClasePrincipal/Casino";
import { IJuego } from "../InterfaceJuego";

// Clase que implementa el juego Mayor o Menor. El jugador apuesta si la próxima carta será mayor o menor que la actual
export class mayorMenor implements IJuego{
    private casino:Casino;                                                    // Instancia del casino para gestionar el saldo
    private mazoDeCartas:Array<{nombre:string, palo:string, valor:number}>;   // Mazo de cartas del juego
    private luz:number;                                                       // Monto total apostado en la ronda actual
    private verCartaCasino:boolean;                                           // Controla si se debe mostrar la carta del casino
    private cartaUsuario:{nombre:string, palo:string, valor:number};          // Carta actual del usuario
    private cartaCasino:{nombre:string, palo:string, valor:number};           // Carta actual del casino

    // Inicializa el juego con una referencia al casino
    constructor(pCasino:Casino){
        this.casino = pCasino;
        this.mazoDeCartas = [];
        this.construirMazo();                                    // Construye el mazo de cartas al iniciar
        this.luz = 0;                                            // Inicializa la apuesta en 0
        this.verCartaCasino = false;                             // Oculta la carta del casino inicialmente
        this.cartaUsuario = {nombre: "", palo: "", valor: 0};    // Inicializa carta del usuario
        this.cartaCasino = {nombre: "", palo: "", valor: 0};     // Inicializa carta del casino
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
                this.mazoDeCartas.push(auxCarta);
            }
        }
    }

	setLuz(pLuz:number){
		this.luz += pLuz; 
	}

    getMontoApostado(){
        return this.luz;
    }

    // Inicia una nueva ronda del juego
    jugar(){
        this.cartaUsuario = this.obtenerCartaRandom();     // Reparte carta al usuario
        this.cartaCasino = this.obtenerCartaRandom();      // Reparte carta al casino
        this.mostrarSubMenu();                             // Muestra el subMenú de juego
    }

    // retorna Una carta aleatoria del mazo
    obtenerCartaRandom(): {nombre: string, palo: string, valor: number} {
        const claseRandom = new Random(); 
        let cartaElegida = claseRandom.pick(this.mazoDeCartas);
        return cartaElegida;
    }


	// Muestra el subMenú de opciones durante el juego. Permite al usuario ver su carta, subir la apuesta o salir del juego 
	mostrarSubMenu(){
        let salir: boolean = false;  // Controla el bucle del subMenú

		while (!salir) {

			// Muestra la interfaz del submenú
			console.clear();
			this.mostrarCartasConsola()  // Muestra la cartas actual del usuario unicamente
			console.log("---------------------------------------------------------");
			// Muestra el saldo actual y el monto apostado
			console.log(`[  💰 Saldo actual: $${this.casino.obtenerSaldo()} >>> Monto Apostado: $${this.getMontoApostado()} <<<  ]\n`);
			
			// Opciones del menú
			console.log("1. Ver Carta sin subir apuesta");
			console.log("2. Subir apuesta");
			console.log("0. Salir");
			console.log("");

			// Solicita la opción al usuario
			let opcion:number = rs.questionInt("Seleccione una opcion: ");
			
			// Procesa la opción seleccionada
			switch(opcion){
				// Opción 1: Ver carta sin aumentar la apuesta
				case 1:
					this.setApuesta(this.luz);  // Mantiene la apuesta actual
					break;
					
				// Opción 2: Aumentar la apuesta
				case 2:
					let validar = false;         // Controla la validación de la apuesta
					while(!validar){
						// Solicita el monto a apostar
						let apuesta:number = rs.questionInt("Ingrese la cantidad a apostar: ");
					
						// Verifica si hay saldo suficiente y que el monto sea válido (no números negativos)
						if(this.casino.descontarApuesta(apuesta) && apuesta >= 0){
							apuesta += this.luz;             // Suma la nueva apuesta a la luz
							this.setApuesta(apuesta);        // Actualiza el nuevo monto de la apuesta
							this.mostrarCartasConsola();     // Muestra las cartas actualizadas
							validar = true;                  // Sale del bucle de validación
						}else{
							console.log("\nEl monto ingresado es incorrecto o no tiene saldo suficiente.");
						}
					}
					break;
					
				// Opción 0: Salir del juego
				case 0:
					console.log("Gracias por visitar el juego de Menor o Mayor, que disfrute su estadia en el Casino La Rula te seca 😄💰🍀.");
					salir = true;  // Sale del bucle del subMenú
					break;
					
				// Opción por defecto: Entrada no válida
				default:
					console.log("\nUsted ha ingresado un numero incorrecto 😕 ");
					rs.question("Presione Enter para volver al menu");
					break;
			}
		}	
	}


    // Evalúa el resultado de la apuesta y paga el premio correspondiente. Parametro pApuesta es el Monto total apostado en la ronda
    setApuesta(pApuesta: number): void {
        this.verCartaCasino = true;       // Muestra la carta del casino
        this.mostrarCartasConsola();      // Actualiza la visualización

        if(this.cartaUsuario.valor > this.cartaCasino.valor) {
            // El usuario gana: paga el doble de lo apostado
            console.log(`Ganaste!!!! Total Ganado: $${pApuesta}`);
            this.pagarPremio(pApuesta * 2);

        } else if(this.cartaUsuario.valor === this.cartaCasino.valor) {
            // Empate: devuelve la apuesta
            console.log(`Saliste hecho..... apuesta recuperada: $${pApuesta}`);
            this.pagarPremio(pApuesta);

        } else {
            // El usuario pierde: no paga premio (valor del premio es 0)
            console.log(`😢 Sin suerte.... has perdido $${pApuesta}`);
            this.pagarPremio(0);
        }
		
        console.log();
        rs.question("presione ENTER para continuar");
            

    };

	// Muestra las cartas en la consola con formato. Si verCartaCasino es false, solo muestra la carta del usuario
	// Si es true, muestra ambas cartas (usuario y casino)
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
		};
	};
    
    // Acredita el premio al jugador y reinicia el estado de la ronda
    pagarPremio(pPremio: number): void {
        this.casino.cargarCreditos(pPremio);     // Acredita el premio
        this.verCartaCasino = false;             // Oculta la carta del casino
        this.luz = 0;                            // Reinicia la apuesta
    };

}

import * as rs from "readline-sync";
import { Random } from "random-js";
import { Casino } from "../../Clases/Casino";
import { IJuego } from "../InterfaceJuego";

export class mayorMenor implements IJuego{
    private casino:Casino;
    private mazoDeCartas:{nombre:string,palo:string,valor:number}[];    
    private luz:number;
    private verCartaCasino:boolean;
    private cartaUsuario:{nombre:string,palo:string,valor:number};  
    private cartaCasino:{nombre:string,palo:string,valor:number}; 

    constructor(pCasino:Casino){
        this.casino = pCasino;
        this.mazoDeCartas = [];
        this.construirMazo();
        this.luz = 0;
        this.verCartaCasino = false;
        this.cartaUsuario = {nombre: "" , palo: "" , valor: 0};
        this.cartaCasino = {nombre: "" , palo: "" , valor: 0};
    }

    construirMazo(){
        for(let p:number=0; p < 4; p++){
            let auxPalo:string = "";
            if(p === 0){
                auxPalo = "♦️";
            }else if(p === 1){
                auxPalo = "♣️";
            }else if(p === 2){
                auxPalo = "♥️";
            }else{
                auxPalo = "♠️"
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

    getMontoApostado(){
        return this.luz
    }
    
    setLuz(pLuz:number){
        this.luz = pLuz;
    }

    jugar(){
        this.cartaUsuario = this.obtenerCartaRandom();
        this.cartaCasino = this.obtenerCartaRandom();
        this.mostrarSubMenu();
    }

    obtenerCartaRandom():{nombre:string,palo:string,valor:number}{
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

    setApuesta(pApuesta: number): void{

        this.verCartaCasino = true;
        this.mostrarCartasConsola();

        if(this.cartaUsuario.valor > this.cartaCasino.valor){
            console.log(`Ganaste!!!! Total Ganado: $${pApuesta}`);
            this.pagarPremio(pApuesta * 2);
            console.log();
            rs.question("presione ENTER para continuar"); 
        }else if(this.cartaUsuario.valor === this.cartaCasino.valor){
            console.log(`Saliste hecho..... apuesta recuperada: $${pApuesta}`);
            this.pagarPremio(pApuesta);
            console.log();
            rs.question("presione ENTER para continuar"); 
        }else{
            console.log(`😢 Sin suerte.... has perdido $${pApuesta}`);
            this.pagarPremio(0);
            console.log();
            rs.question("presione ENTER para continuar"); 
        }
            

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
	};
    
    pagarPremio(pPremio: number): void{
        this.casino.cargarCreditos(pPremio)
        this.verCartaCasino = false;
        this.luz = 0;
    };

}

import * as rs from "readline-sync";
import { Random } from "random-js";
import { Casino } from "../../Clases/Casino";
import { IJuego } from "../InterfaceJuego";

export class mayorMenor implements IJuego{
    private casino:Casino;
    private mazoDeCartas:{nombre:string,palo:string,valor:number}[];
    private carta:{nombre:string,palo:string,valor:number};  



    constructor(pCasino:Casino){
        this.casino = pCasino;
        this.mazoDeCartas = [];
        this.construirMazo();
        this.carta = {nombre: "" , palo: "" , valor: 0}
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

    mostrarMazo(){
        //this.construirMazo();
        console.log(this.mazoDeCartas);
        rs.question("presione ENTER para continuar");
        
    }

    getMontoApostado(){

    }

    jugar(pLuz:number){
        let cartaUsuario = this.obtenerCartaRandom();
        let cartaCasino = this.obtenerCartaRandom();
        this.mostrarSubMenu(cartaUsuario,cartaCasino);
        
    }

    obtenerCartaRandom():{nombre:string,palo:string,valor:number}{
        const claseRandom = new Random(); 
        let cartaElegida = claseRandom.pick(this.mazoDeCartas);
        return cartaElegida;
    }


	mostrarSubMenu( pCartaUsuario:{nombre:string, palo:string, valor:number}, pCartaCasino:{nombre:string,palo:string,valor:number}){
 		let salir:boolean = false;
		let verCartaCasino:boolean = false;

		console.clear();
		this.mostrarCartasConsola(pCartaUsuario,pCartaCasino,verCartaCasino)
		console.log("---------------------------------------------------------");
		
		console.log("1. Ver Carta sin subir apuesta");
		console.log("2. Subir apuesta");
		console.log("0. Salir");
		console.log("");

		let opcion:number = rs.questionInt("Seleccione una opcion: ");
		
		switch(opcion){
			
			case 1 :
				verCartaCasino = true;
				this.mostrarCartasConsola(pCartaUsuario,pCartaCasino,verCartaCasino);
				rs.question("presione ENTER para continuar"); 
				break
			case 2 :
				let monto:number = rs.questionInt("Ingrese la cantidad a apostar: ");
				let auxApuesta = this.casino.descontarApuesta(monto);
				if (auxApuesta){
					verCartaCasino = true;
					this.mostrarCartasConsola(pCartaUsuario,pCartaCasino,verCartaCasino);

					if(pCartaUsuario.valor > pCartaCasino.valor){
						console.log("Ganaste guacho!!!!");
						console.log();
						rs.question("presione ENTER para continuar"); 
					}else if(pCartaUsuario.valor === pCartaCasino.valor){
						console.log("Saliste hecho.....");
						console.log();
						rs.question("presione ENTER para continuar"); 
					}else{
						console.log("😢 LOLA-mento....");
						console.log();
						rs.question("presione ENTER para continuar"); 
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

	mostrarCartasConsola(pCartaUsuario:{nombre:string, palo:string, valor:number}, pCartaCasino:{nombre:string,palo:string,valor:number}, verCartaCasino:boolean){
		console.clear();
		if(!verCartaCasino){
		console.log(`
+------------------------------------------------+
|                                                |
|       CARTA USUARIO                            |
|       +-----------+                            |
|       | ${pCartaUsuario.nombre}        |                            |
|       |           |                            |
|       |    ${pCartaUsuario.palo}      |                            |
|       |           |                            |
|       |        ${pCartaUsuario.nombre} |                            |
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
|       | ${pCartaUsuario.nombre}        |       | ${pCartaCasino.nombre}        |        |
|       |           |       |           |        |
|       |    ${pCartaUsuario.palo}      |       |    ${pCartaCasino.palo}      |        |
|       |           |       |           |        |
|       |        ${pCartaUsuario.nombre} |       |        ${pCartaCasino.nombre} |        |
|       +-----------+       +-----------+        |
|                                                |
+------------------------------------------------+
		`);
		}


	}


    mostrarCartaRandom(){

	}

    setApuesta(pApuesta: number): void{

    };
    
    
    pagarPremio(pPremio: number): void{

    };
}

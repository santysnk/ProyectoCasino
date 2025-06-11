import {IJuego} from "../InterfaceJuego"
import {Casino} from "../../Clases/Casino"

class MayorMenor implements IJuego{

	private cartas : {nombre:string, valor:number}[];

	constructor(pCacino:Casino){
		this.cartas = [];
		this.construirMAzo();
	}
	
	construirMAzo(){
		for (let i:number = 1 ; i <= 12 ; i++){
			const aux = {
				nombre : i.toString(),
				valor : i
				}
			this.cartas.push(aux)	
		}
	}

    /**
     * Establece el monto de la apuesta para el juego.
     * parametro pApuesta - El monto que el jugador desea apostar.
     */
    setApuesta(pApuesta: number): void{

	}
    
    /**
     * Maneja el pago de premios al jugador.
     * parametro pPremio - El monto del premio a pagar.
     */
    pagarPremio(pPremio: number): void{

	}

}

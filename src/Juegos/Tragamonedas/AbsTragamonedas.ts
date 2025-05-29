import { IJuego } from "../InterfaceJuego";
import { Casino } from '../../Clases/Casino';

export abstract class Tragamonedas implements IJuego { 
    protected casino : Casino;
    protected nombre : string;

    constructor (pCasino: Casino) {
        this.casino = pCasino;
        this.nombre = "Tragamonedas";
    }


    validarApuesta(pApuesta : number) : void {
        this.casino.descontarApuesta(pApuesta);
    }


    pagarPremio(pPremio : number) : void{

    }

    abstract jugar() : void


}
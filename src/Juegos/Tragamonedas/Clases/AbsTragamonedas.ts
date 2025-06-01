import { IJuego } from "../../InterfaceJuego";
import { Casino } from '../../../Clases/Casino';

export abstract class Tragamonedas implements IJuego { 
    protected casino : Casino;
    protected nombre : string;
    protected apuesta : number;
    protected simbolos: string[];
    protected matriz : string[][];
    protected premios:number[];
    protected Ganado:number; 

    constructor (pCasino: Casino, pNombre:string, pSimbolos:string[]) {
        this.nombre = pNombre;
        this.casino = pCasino;
        this.apuesta = 0;
        this.simbolos = pSimbolos;
        this.matriz = this.matriz = [];
        this.premios = []; 
        this.Ganado = 0;
    }

    getApuesta():number{
        return this.apuesta
    }

    setApuesta(pApuesta : number){
        this.apuesta = pApuesta;
    }

    getGanado():number{
        return this.Ganado
    }

    
    abstract mostrarMatriz(): void ;

    abstract mostrarMatrizDemo(): void;

    abstract jugar() : void

    abstract pagarPremio() : void


}
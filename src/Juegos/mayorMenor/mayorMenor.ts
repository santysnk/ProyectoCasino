import * as rs from "readline-sync";
import { Casino } from "../../Clases/Casino";
import { IJuego } from "../InterfaceJuego";

export class mayorMenor implements IJuego{
    private casino:Casino;
    private mazoDeCartas:{nombre:string,palo:string,valor:number}[];



    constructor(pCasino:Casino){
        this.casino = pCasino;
        this.mazoDeCartas = [];
    }

    construirMazo(){
        for(let p:number=0; p < 4; p++){
            let auxPalo:string = "";
            if(p === 0){
                auxPalo = "espada";
            }else if(p === 1){
                auxPalo = "basto";
            }else if(p === 2){
                auxPalo = "oro";
            }else{
                auxPalo = "copa"
            }
            for(let c:number = 1; c <= 12; c++){
                let auxCarta = {
                    nombre : c.toString(),
                    palo : auxPalo,
                    valor : c
                }
                this.mazoDeCartas.push(auxCarta)
            }
        }
    }

    mostrarMazo(){
        this.construirMazo();
        console.log(this.mazoDeCartas);
        rs.question("presione ENTER para continuar");
        
    }

    setApuesta(pApuesta: number): void{

    };
    
    
    pagarPremio(pPremio: number): void{

    };
}

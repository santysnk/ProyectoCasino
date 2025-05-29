/**empezar de nuevo  */
function obtenerUnoODos(): string {
    let numeroAleatorio = Math.random(); // número entre 0 (inclusive) y 1 (exclusivo) 0,265 - 0.865 -0.423 0.361 0.015
    console.log(numeroAleatorio);

    if (numeroAleatorio >= 0 && numeroAleatorio < 0.5) {
        return "😊";
    } else {
        return "❌";
    }
}

let miNumeroAleatorio:string =  obtenerUnoODos();

console.log(miNumeroAleatorio);
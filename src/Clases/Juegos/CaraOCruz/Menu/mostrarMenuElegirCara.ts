import readlineSync from 'readline-sync';

export function mostrarMenuElegirCara(): string | null {
    let salir: boolean = false;
    let eleccion: string | null = null;

    while (!salir) {
        console.clear();
        console.log("🎲 Bienvenido al juego de Cara o Cruz 🎲");
        console.log("------------------------------------------------------------\n");
        console.log("1. Elegir Cara 🟩");
        console.log("2. Elegir Cruz 🟥");
        console.log("0. Salir");

        const opcion: number = readlineSync.questionInt("Seleccione una opción: ");

        switch (opcion) {
            case 1:
                eleccion = "cara";
                console.log("Has elegido Cara 🟩");
                salir = true;
                break;
            case 2:
                eleccion = "cruz";
                console.log("Has elegido Cruz 🟥");
                salir = true;
                break;
            case 0:
                console.log("Gracias por jugar");
                salir = true;
                eleccion = null;
                break;
            default:
                console.log("❌ Opción inválida.");
                readlineSync.question("Presione ENTER para continuar...");
                break;
        }
    }

    return eleccion;
}
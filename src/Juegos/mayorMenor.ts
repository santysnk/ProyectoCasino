import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

type Carta = { suit: string; value: string; rank: number };

const SUITS = ['♠', '♥', '♦', '♣'];
const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

const crearMazo = (): Carta[] =>
    VALUES.flatMap((value, i) =>
        SUITS.map((suit) => ({ suit, value, rank: i + 4 }))
    );

const mezclar = (mazo: Carta[]): Carta[] => {
    for (let i = mazo.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazo[i], mazo[j]] = [mazo[j], mazo[i]];
    }
    return mazo;
};

const preguntar = (q: string): Promise<string> =>
    new Promise((res) => rl.question(q, res));

async function jugar() {
    let saldo = 100;
    let mazo = mezclar(crearMazo());

    console.log("🃏 Bienvenido a Mayor o Menor");    
    console.log(/*sincronizar con saldo ingresado*/);

    while (saldo > 0) {
        if (mazo.length < 2) mazo = mezclar(crearMazo());

        const actual = mazo.pop()!;
        console.log(`\nCarta actual: ${actual.value}${actual.suit}`);

        const eleccion = (await preguntar("¿(m)ayor o (n)menor?: ")).toLowerCase();
        const apuesta = parseInt(await preguntar("¿Cuánto apuestas?: "));

        if (isNaN(apuesta) || apuesta <= 0 || apuesta > saldo) {
            console.log("Apuesta inválida.");
            continue;
        }

        const siguiente = mazo.pop()!;
        console.log(`Siguiente carta: ${siguiente.value}${siguiente.suit}`);

        const gana = (eleccion === 'm' && siguiente.rank > actual.rank)
                  || (eleccion === 'n' && siguiente.rank < actual.rank);

        if (siguiente.rank === actual.rank) {
            console.log("¡Empate! Pierdes.");
            saldo -= apuesta;
        } else if (gana) {
            console.log("🎉 ¡Ganaste!");
            saldo += apuesta;
        } else {
            console.log("😢 Perdiste.");
            saldo -= apuesta;
        }

        console.log(`Saldo: $${saldo}`);

        const continuar = (await preguntar("¿Seguir jugando? (s/n): ")).toLowerCase();
        if (continuar !== 's') break;
    }

    console.log(`Gracias por jugar. Saldo final: $${saldo}`);
    rl.close();
}

jugar();

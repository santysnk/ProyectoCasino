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


/*import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

type Carta = {
    suit: string;
    value: string;
    rank: number;
};

const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function crearMazo(): Carta[] {
    const deck: Carta[] = [];
    values.forEach((value, index) => {
        suits.forEach((suit) => {
            deck.push({
                suit,
                value,
                rank: index + 4
            });
        });
    });
    return deck;
}

function shuffle(deck: Carta[]): Carta[] {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

async function jugar() {
    let balance = 100;
    let deck = shuffle(crearMazo());

    console.log("🃏 Bienvenido a Mayor o Menor");
    console.log(/*sincronizar con saldo ingresado*);

    while (balance > 0) {
        if (deck.length < 2) {
            console.log("Mezclando un nuevo mazo...");
            deck = shuffle(crearMazo());
        }

        const cartaActual = deck.pop()!;
        console.log(`\nCarta actual: ${cartaActual.value}${cartaActual.suit}`);

        const guess = (await askQuestion("¿La siguiente carta será (m)ayor o (n)menor? ")).toLowerCase();
        const betStr = await askQuestion("¿Cuánto deseas apostar? ");
        const bet = parseInt(betStr);

        if (isNaN(bet) || bet <= 0 || bet > balance) {
            console.log("Apuesta inválida.");
            continue;
        }

        const siguienteCarta = deck.pop()!;
        console.log(`siguien Carta: ${siguienteCarta.value}${siguienteCarta.suit}`);

        const won = (
            (guess === 'm' && siguienteCarta.rank > cartaActual.rank) ||
            (guess === 'n' && siguienteCarta.rank < cartaActual.rank)
        );

        if (siguienteCarta.rank === cartaActual.rank) {
            console.log("¡Empate! Pierdes la apuesta.");
            balance -= bet;
        } else if (won) {
            console.log("🎉 ¡Ganaste!");
            balance += bet;
        } else {
            console.log("😢 Perdiste.");
            balance -= bet;
        }

        console.log(`Saldo actual: $${balance}`);

        const again = (await askQuestion("¿Deseas seguir jugando? (s/n): ")).toLowerCase();
        if (again !== 's') break;
    }

    console.log("Gracias por jugar. Tu saldo final es: $" + balance);
    rl.close();
}

jugar();*/
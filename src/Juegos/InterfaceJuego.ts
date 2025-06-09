/**
 * Interfaz que define la estructura básica que deben implementar todos los juegos del casino.
 * Esta interfaz asegura que todos los juegos tengan los métodos esenciales para funcionar
 * dentro del ecosistema del casino.
 */
export interface IJuego {
    /**
     * Establece el monto de la apuesta para el juego.
     * @param pApuesta - El monto que el jugador desea apostar.
     */
    setApuesta(pApuesta: number): void;
    
    /**
     * Maneja el pago de premios al jugador.
     * @param pPremio - El monto del premio a pagar.
     */
    pagarPremio(pPremio: number): void;
}
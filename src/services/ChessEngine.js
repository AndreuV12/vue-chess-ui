import { status, moves, move } from "js-chess-engine";

class ChessEngine {
  /**
   * @returns {Object} Un diccionario con los movimientos posibles.
   * Ejemplo de resultado: { E3: ['E4', 'E5'], D3: ['D4', 'D5'] }
   */
  static getMoves(fen) {
    return moves(fen);
  }

  /**
   * @returns {Object} Un diccionario con las coordenadas y las piezas.
   * Ejemplo de resultado: { E3: 'r', E4: 'K' }
   */
  static getPieces(fen) {
    if (!fen) return {};
    return status(fen).pieces;
  }

  /**
   * @returns {string} El turno del jugador ('w' para blancas, 'b' para negras).
   */
  static getTurn(fen) {
    return fen.split(" ")[1];
  }

  static doMove(fen, from, to) {
    /**
     * @returns {string} El nuevo fen  recalculado despues de aplicar el movimiento
     */
    return move(fen, from, to);
  }

  /**
   * @returns {string} El movimiento codificado en formato uci
   */
  static getUciMove(from, to) {
    return `${from}${to}`.toLowerCase();
  }

  static getCoordinadesMove(uciMove) {
    /**
     * @returns {[string, string]} El movimiento codificado en formato [from, to]
     *  Ejemplo de resultado: ['E2', 'E4']
     */
    const from = uciMove.slice(0, 2).toUpperCase(); // Primeras dos letras
    const to = uciMove.slice(2, 4).toUpperCase(); // Siguientes dos letras
    return [from, to];
  }
}

export default ChessEngine;

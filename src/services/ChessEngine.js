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
    console.log("doing Move", fen, from, to);

    return move(fen, from, to);
  }
}

export default ChessEngine;

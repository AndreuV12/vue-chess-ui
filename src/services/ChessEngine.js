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

  static getMoveName(fen, from, to) {
    const pieces = this.getPieces(fen);
    const piece = pieces[from];
    const captured = Boolean(pieces[to]);

    // Check Promotion
    if (piece.toUpperCase() === "P") {
      const isPromotion = to[1] === "1" || to[1] === "8";
      if (isPromotion) {
        return this.handlePawnPromotion(piece, to);
      } else {
        return captured ? `${from[0]}x${to}`.toLowerCase() : to.toLowerCase();
      }
    }

    // Check Castling
    if (piece.toUpperCase() === "K") {
      if ((from === "E1" && to === "G1") || (from === "E8" && to === "G8")) {
        return "0-0";
      }
      if ((from === "E1" && to === "C1") || (from === "E8" && to === "C8")) {
        return "0-0-0";
      }
    }

    // Other cases
    let moveName = piece.toUpperCase();

    // Solve ambiguity
    const possibleMoves = moves(fen);
    const samePieces = Object.keys(possibleMoves).filter(
      (el) => pieces[el] === piece && el !== from
    );
    let moveIndicator = "";
    for (const el of samePieces) {
      if (possibleMoves[el]?.includes(to)) {
        if (el[0] !== from[0]) {
          moveIndicator += from[0].toLowerCase(); // Especifica columna
        } else {
          moveIndicator += from[1]; // Especifica fila
        }
        break;
      }
    }
    moveName += moveIndicator;

    // Capture
    if (captured) moveName += "x";
    moveName += to.toLowerCase();
    return moveName;
  }
}

export default ChessEngine;

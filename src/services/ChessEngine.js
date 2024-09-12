import { status, moves } from 'js-chess-engine';

class ChessEngine {
  // Obtener los movimientos posibles para una posición dada en FEN
  static getMoves(fen) {
    return moves(fen);
  }

  static getPieces(fen) {
    return status(fen).pieces
  }
}

export default ChessEngine;
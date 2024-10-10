<template>
    <Board :fen="fen" :selected-coor="selectedCoor" @on-click="handleCoorClick">
    </Board>
</template>

<script>
import Board from '../Board/Board.vue';

import ChessEngine from '../../services/ChessEngine';

export default {
    name: 'InteractiveBoard',
    components: {
        Board
    },
    props: {
        fen: {
            type: String,
            default: () => "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        },
    },
    data: () => ({
        selectedCoor: null,
    }),
    computed: {
        turn() {
            return ChessEngine.getTurn(this.fen)
        },
        pieces() {
            return ChessEngine.getPieces(this.fen)
        },
        moves() {
            return ChessEngine.getMoves(this.fen)
        },
    },
    methods: {
        handleCoorClick(coor) {
            if (!this.selectedCoor) {
                if (this.isSelectableCoor(coor)) {
                    this.selectedCoor = coor
                }
            }
            else {
                if (this.isValidMove(this.selectedCoor, coor)) {
                    this.doMove(this.selectedCoor, coor)
                    this.selectedCoor = null
                }
                else if (this.isSelectableCoor(coor)) {
                    this.selectedCoor = coor
                }
                else {
                    this.selectedCoor = null
                }
            }
        },

        isSelectableCoor(coor) {
            const piece = this.pieces[coor]
            if (!piece) return false
            if (this.turn == "w") {
                return (piece === piece.toUpperCase())
            }
            else
                return (piece === piece.toLowerCase())

        },

        isValidMove(from, to) {
            return this.moves?.[from]?.includes(to)
        },

        doMove(from, to) {
            const uciMove = ChessEngine.getUciMove(from, to)
            this.$emit('move', uciMove)
        }
    },
}
</script>
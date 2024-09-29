<template>
    <h1 class="mb-2">Opening Detail</h1>
    <span class="openingTitle mb-2">{{ opening.name }}</span>
    <v-row class="d-flex flex-nowrap" style="max-height: 75vh; overflow: scroll;">
        <v-col cols="8" style="min-height: 400px; min-width: 400px;">
            <InteractiveBoard :fen="fen" @move="handleMove">
            </InteractiveBoard>
        </v-col>
        <v-col cols="auto" style="min-height: 400px;">
            <MovesTable :moves="moves" :bestMoves="bestMoves" @clickMove="handleUciMove" @clickPrev="goPrevMove"
                @clickNext="goNextMove">
            </MovesTable>
        </v-col>
    </v-row>
</template>

<script>
import Board from '../components/Board/Board.vue';
import InteractiveBoard from '../components/OpeningDetail/InteractiveBoard.vue';
import MovesTable from '../components/OpeningDetail/MovesTable.vue';

import ChessEngine from '../services/ChessEngine';

import api from '../services/Api';
export default {
    components: {
        Board,
        InteractiveBoard,
        MovesTable,
    },
    name: 'Openings',

    data() {
        return {
            rightBar: false,
            opening: {},
            path: [] // played moves
        }
    },
    async mounted() {
        this.opening = await api.fetchOpening(this.$route.params.id)
    },
    computed: {
        fen() {
            if (!this.opening?.data) return null
            let data = JSON.parse(JSON.stringify(this.opening.data))
            for (const move of this.path) {
                data = data?.moves[move]
            }
            return data.fen
        },
        moves() {
            if (!this.opening?.data) return null
            let data = JSON.parse(JSON.stringify(this.opening.data))
            for (const move of this.path) {
                data = data.moves[move]
            }
            return data.moves
        },
        bestMoves() {
            if (!this.opening?.data) return null
            let data = JSON.parse(JSON.stringify(this.opening.data))
            for (const move of this.path) {
                data = data.moves[move]
            }
            return data.analysis || []
        }
    },
    methods: {
        // From Board
        async handleMove([from, to]) {
            const uciMove = ChessEngine.getUciMove(from, to)
            if (!Object.keys(this.moves).includes(uciMove)) {
                const fen = ChessEngine.doMove(this.fen, from, to)
                this.addMoveToOpening(uciMove, this.opening, this.path, fen) // No dot await until response
            }
            this.path.push(uciMove)
        },

        async addMoveToOpening(uciMove, opening, path, fen) { // Updates opening syncronously (computing locally) so it is not necessary to await for response
            const newMove = {
                fen,
                uci: uciMove,
                moves: {}
            }
            const openingCopy = JSON.parse(JSON.stringify(opening))
            let data = openingCopy.data
            for (const move of path) {
                data = data.moves[move]
            }
            data.moves[uciMove] = newMove
            this.opening = openingCopy // Update before response

            const pathDeepBeforeRequest = this.path.length
            const updatedOpening = await api.addMoveToOpening(opening.id, newMove, path)
            const pathDeepAfterRequest = this.path.length

            if (pathDeepBeforeRequest + 1 == pathDeepAfterRequest) { // No new moves while request is solving
                this.opening = updatedOpening
            }
        },

        // From Table
        async handleUciMove(uciMove) {
            const [from, to] = ChessEngine.getCoordinadesMove(uciMove)
            this.handleMove([from, to])
        },

        goPrevMove() {
            this.path.pop()
        },

        goNextMove() {
            const nextMove = Object.values(this.moves)?.[0]?.uci
            if (nextMove) {
                this.path.push(nextMove)
            }
        }
    }
};
</script>
<style>
.openingTitle {
    display: block;
    font-size: 22px;
    font-style: italic;
    color: rgb(79, 79, 79);
}
</style>
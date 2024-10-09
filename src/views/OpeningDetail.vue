<template>
    <h1 class="mb-2">Opening Detail</h1>

    <div class="d-flex mb-6  align-center justify-space-between">
        <!-- Aquí iran mas botones -->
        <span class="openingTitle mb-2">{{ opening.name }}</span>
        <div>
            <v-btn variant="text" icon="mdi-image-move"></v-btn>
            <v-btn variant="text" icon="mdi-orbit-variant" @click="rotateBoard"></v-btn>
            <v-btn variant="text" icon="mdi-cog"></v-btn>
        </div>

    </div>

    <v-row class="d-flex flex-nowrap justify-center">
        <v-col cols="auto" style="min-width: fit-content;">
            <InteractiveBoard :fen="fen" :width="'75vh'" :rotated="rotated" @move="handleMove">
            </InteractiveBoard>
        </v-col>
        <v-col cols="auto" style="min-width: fit-content;">
            <MovesTable :moves="sortedStoredMoves" :bestMoves="sortedBestMoves" @clickMove="handleUciMove"
                @clickPrev="goPrevMove" @clickNext="goNextMove" :height="'75vh'">
            </MovesTable>
        </v-col>
    </v-row>
</template>

<script>
import Mousetrap from 'mousetrap';

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
            path: [],
            lastAddedMove: null,
            rotated: false,
        }
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
            return data.moves || {}
        },
        analysis() {
            if (!this.opening?.data) return null
            let data = JSON.parse(JSON.stringify(this.opening.data))
            for (const move of this.path) {
                data = data.moves[move]
            }
            return data.analysis || []
        },

        sortedStoredMoves() {
            if (!this.moves) return []
            return Object.values(this.moves).map(move => ({ name: move.name, uci: move.uci, score: move.analysis?.[0]?.score }))
        },

        sortedBestMoves() {
            return this.analysis || []
        },

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

            this.lastAddedMove = uciMove
            const updatedOpening = await api.addMoveToOpening(opening.id, newMove, path)

            if (this.lastAddedMove == uciMove) { // No new moves while request is solving
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
        },

        rotateBoard() {
            this.rotated = !this.rotated
        }
    },
    async mounted() {
        Mousetrap.bind('r', this.rotateBoard)
        this.opening = await api.fetchOpening(this.$route.params.id)
    },
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
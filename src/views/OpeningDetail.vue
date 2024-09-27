<template>
    <h1 class="mb-2">Opening Detail</h1>
    <span class="openingTitle mb-2">{{ opening.name }}</span>
    <v-row class="d-flex flex-nowrap" style="max-height: 75vh; overflow: scroll;">
        <v-col cols="8" style="min-height: 400px; min-width: 400px;">
            <InteractiveBoard :fen="fen" @move="handleMove">
            </InteractiveBoard>
        </v-col>
        <v-col cols="auto" style="min-height: 400px;">
            <MovesTable :moves="moves" @clickMove="doMoveFromTable" @clickPrev="goPrevMove" @clickNext="goNextMove"
                style="min-width: 240px">
            </MovesTable>
        </v-col>
        <!-- <v-col>
        </v-col> -->
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
        console.log(this.opening);

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
        }
    },
    methods: {
        // From Board
        async handleMove([from, to]) {
            const uciMove = ChessEngine.getUciMove(from, to)
            if (!Object.keys(this.moves).includes(uciMove)) {
                const moveName = ChessEngine.getMoveName(this.fen, from, to)
                const fen = ChessEngine.doMove(this.fen, from, to)
                this.addMoveToOpening(moveName, [from, to], this.opening, this.path, fen)
            }
            this.path.push(uciMove)
        },

        async addMoveToOpening(moveName, [from, to], opening, path, fen) { // Updates opening syncronously (computing locally) so it is not necessary to await for response
            const uciMove = ChessEngine.getUciMove(from, to)
            const newMove = {
                fen,
                uci: uciMove,
                name: moveName,
                moves: {}
            }
            const openingCopy = JSON.parse(JSON.stringify(opening))
            let data = openingCopy.data
            for (const move of path) {
                data = data.moves[move]
            }
            data.moves[uciMove] = newMove
            this.opening = openingCopy // Update before response

            const updatedOpening = await api.addMoveToOpening(opening.id, newMove, path)
            this.opening = updatedOpening // Update with response go get data sync
        },

        // From Board
        doMoveFromTable(moveUci) {
            this.path.push(moveUci)
        },

        goPrevMove() {
            this.path.pop()
        },

        goNextMove() {
            const nextMove = Object.values(this.moves)?.[0].uci
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
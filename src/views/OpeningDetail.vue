<template>
    <h1 class="mb-2">Opening Detail</h1>
    <span class="openingTitle mb-2">{{ opening.name }}</span>
    <v-row class="d-flex flex-nowrap" style="max-height: 80vh">
        <v-col cols="8">
            <InteractiveBoard :fen="fen" @move="handleMove"></InteractiveBoard>
        </v-col>
        <v-col cols="4">
            <MovesTable :moves="moves" @clickMove="doMoveFromTable"></MovesTable>
            <v-row>
                <v-col>
                    <v-btn class="mt-4" @click.stop="path.pop()">
                        Prev
                    </v-btn>
                </v-col>
                <v-col class="text-end">
                    <v-btn class="mt-4" @click.stop="path.pop()">
                        Next
                    </v-btn>
                </v-col>
            </v-row>
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
            console.log("computing fen", data, this.path);
            for (const move of this.path) {
                data = data?.moves[move]
            }
            console.log(data);

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
        async handleMove(move) {
            const moveName = JSON.stringify(move)
            if (!Object.keys(this.moves).includes(moveName)) {
                const fen = ChessEngine.doMove(this.fen, move[0], move[1])
                this.addMoveToOpening(moveName, this.opening, this.path, fen)
            }
            this.path.push(moveName)
        },

        doMoveFromTable(moveName) {
            this.path.push(moveName)
        },

        async addMoveToOpening(moveName, opening, path, fen) { // Updates opening syncronously (computing locally) so it is not necessary to await for response
            const newMove = {
                fen,
                moves: {}
            }
            const openingCopy = JSON.parse(JSON.stringify(opening))
            let data = openingCopy.data
            for (const move of path) {
                data = data.moves[move]
            }
            data.moves[moveName] = newMove
            this.opening = openingCopy
            const updatedOpening = await api.addMoveToOpening(opening.id, moveName, newMove, path)
            this.opening = updatedOpening
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
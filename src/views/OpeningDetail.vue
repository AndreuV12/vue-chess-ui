<template>
    <h1 class="mb-2">Opening Detail</h1>
    <span class="openingTitle mb-2">{{ opening.name }}</span>
    <v-row class="d-flex flex-nowrap" style="max-height: 80vh">
        <v-col cols="8">
            <InteractiveBoard :fen="fen" @move="handleMove"></InteractiveBoard>
        </v-col>
        <v-col cols="4">
            <MovesTable></MovesTable>
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
            for (move of this.path) {
                data = data.moves[move]
            }
            return data.moves
        }
    },
    methods: {
        handleMove(move) {
            const moveName = JSON.stringify(move)
            const fen = ChessEngine.doMove(this.fen, move[0], move[1])
            this.addMoveToOpening(moveName, this.opening, this.path, fen)
            this.path.push(moveName)
            console.log("Updated", this.path, this.opening);

        },

        addMoveToOpening(moveName, opening, path, fen) {
            const openingCopy = JSON.parse(JSON.stringify(opening))
            let data = openingCopy.data
            console.log("add move", data, path);

            for (const move of path) {
                data = data.moves[move]
            }
            data.moves[moveName] = {
                fen,
                moves: {}
            }
            this.opening = openingCopy
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
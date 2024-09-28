<template>
    <div class="moves-table-container fill-height">
        <v-table class="moves-table" dense>
            <thead class="moves-table__header">
                <tr>
                    <th style="width: 10px">Move</th>
                    <th style="width: 10px">Score</th>
                </tr>
            </thead>
            <tbody class="moves-table__body">
                <tr v-for="(moveData, moveUci) in moves" :key="moveUci" @click.stop="handleMoveClicked(moveUci)">
                    <td> {{ moveData.name || ".." }} </td>
                    <td>
                        <span v-if="moveData.analysis">
                            {{ moveData.analysis[0].score / 100 }}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        StockfishMoves
                    </td>
                </tr>
                <tr v-for="moveData in bestMoves" @click.stop="handleMoveClicked(moveData.uci)">
                    <td> {{ moveData.name || ".." }} </td>
                    <td>
                        <span>
                            {{ moveData.score / 100 }}
                        </span>
                    </td>

                </tr>
            </tbody>
        </v-table>
        <div class="moves-table-container__actions d-flex justify-center">
            <v-btn hide-details variant="text" icon="mdi-skip-previous" @click.stop="handlePrevClicked"></v-btn>
            <v-btn hide-details variant="text" icon="mdi-skip-next" @click.stop="handleNextClicked"></v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MovesTable',
    props: {
        moves: {
            type: Object,
            default: () => { }
        },
        bestMoves: {
            type: Array,
            default: () => []
        }
    },
    data: () => ({

    }),
    mounted() {
    },
    computed: {
    },
    watch: {
    },
    methods: {
        handleMoveClicked(uciMove) {
            this.$emit('click-move', uciMove)
        },
        handlePrevClicked() {
            this.$emit('click-prev')
        },
        handleNextClicked() {
            this.$emit('click-next')
        }
    },
}
</script>
<style lang="css" scoped>
.moves-table-container {
    border-radius: 4px;
    background-color: rgb(237, 237, 237);
    position: relative;
}

/* .moves-table {

    height: 90%;
} */

.moves-table__header {
    background-color: rgb(215, 215, 215)
}

.moves-table__body {
    background-color: rgb(240, 240, 240);
}

.moves-table__body>tr:hover {
    background-color: rgb(225, 225, 225);
    cursor: pointer;
}

.moves-table-container__actions {
    position: absolute;
    bottom: 0;
    left: 0;
    /* border: 2px solid red; */
    width: 100%;
}

.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td {
    border: none;
}
</style>

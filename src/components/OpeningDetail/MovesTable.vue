<template>
    <div class="moves-table-container" :style="{ height: height }">
        <v-table class="moves-table" dense density="compact">
            <tbody class="moves-table__body">
                <tr>
                    <td colspan="2" class="pt-2">
                        <span style="font-weight: bold"> Best Moves</span>
                    </td>
                </tr>
                <tr v-for="moveData, i in bestMoves" @click.stop="handleMoveClicked(moveData.uci)" class="move-row">
                    <td width="100px">
                        <span style="color: grey" class="mr-6">{{ i + 1 }}</span>
                        <span>{{ moveData.name || ".." }}</span>
                    </td>
                    <td width="60px">
                        <span>
                            {{ formatScore(moveData.score) }}
                        </span>
                    </td>
                </tr>

                <tr>
                    <td colspan="2" class="pt-4">
                        <span style="font-weight: bold"> Stored Moves</span>
                    </td>
                </tr>
                <tr v-for="(moveData, moveUci) in moves" :key="moveUci" @click.stop="handleMoveClicked(moveUci)"
                    class="move-row">
                    <td width="100px">
                        <span>{{ moveData.name || ".." }}</span>
                    </td>
                    <td width="60px">
                        <span v-if="moveData.analysis">
                            {{ formatScore(moveData.analysis[0].score) }}
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
import Mousetrap from 'mousetrap';

export default {
    name: 'MovesTable',
    components: {
        Mousetrap
    },
    props: {
        moves: {
            type: Object,
            default: () => { }
        },
        bestMoves: {
            type: Array,
            default: () => []
        },
        height: {
            type: String,
            default: () => "600px"
        }
    },
    emits: {
        'click-move': (uciMove) => {
            return typeof uciMove == 'string' && [4, 5].includes(uciMove.length)
        },
        'click-prev': null,
        'click-next': null,
    },
    data: () => ({

    }),
    methods: {
        handleMoveClicked(uciMove) {
            this.$emit('click-move', uciMove)
        },
        handlePrevClicked() {
            this.$emit('click-prev')
        },
        handleNextClicked() {
            this.$emit('click-next')
        },
        formatScore(scoreInCentipawns) {
            if (scoreInCentipawns > 0) {
                return `+${scoreInCentipawns / 100}`
            }
            else return String(scoreInCentipawns / 100)

        }
    },
    mounted() {
        Mousetrap.bind('right', this.handleNextClicked)
        Mousetrap.bind('left', this.handlePrevClicked)
    },
}
</script>
<style lang="css" scoped>
.moves-table-container {
    border-radius: 4px;
    background-color: rgb(240, 240, 240);
    position: relative;
    min-width: 200px;
}

.moves-table__header {
    background-color: rgb(215, 215, 215)
}

.moves-table__body {
    background-color: rgb(240, 240, 240);
    padding: 10px;

}

.moves-table__body>tr {
    height: 40px;
}

.moves-table__body>tr.move-row:hover {
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

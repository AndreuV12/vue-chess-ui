<template>
    <div class="moves-table-container" :style="{ height: height }">
        <v-table class="moves-table" dense density="compact">
            <tbody class="moves-table__body">
                <tr>
                    <td colspan="3" class="pt-2">
                        <span style="font-weight: bold"> Best Moves</span>
                    </td>
                </tr>
                <tr v-for="move, i of bestMoves" :key="i" @click.stop="handleMoveClicked(move.uci)"
                    :class="['move-row', { 'selected': i == selectedMoveIndex }]">
                    <td width="100px">
                        <span style="color: grey" class="mr-6">{{ i + 1 }}</span>
                        <span>{{ move.name || ".." }}</span>
                    </td>
                    <td width="60px">
                        <span>
                            {{ formatScore(move.score) }}
                        </span>
                    </td>
                    <td width="80px">
                    </td>
                </tr>

                <tr>
                    <td colspan="3" class="pt-4">
                        <span style="font-weight: bold"> Stored Moves</span>
                    </td>
                </tr>
                <tr v-for="move, i of moves" :key="i" @click.stop="handleMoveClicked(move.uci)"
                    :class="['move-row', { 'selected': i + bestMoves.length == selectedMoveIndex }]">
                    <td width="100px">
                        <span>{{ move.name || ".." }}</span>
                    </td>
                    <td width="60px">
                        <span v-if="move.score">
                            {{ formatScore(move.score) }}
                        </span>
                    </td>
                    <td class="text-center">
                        <v-btn icon="mdi-delete" variant="text" size="small"
                            @click.stop="$emit('deleteMove', move.uci)"></v-btn>
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
        'click-move': uciMove => !!uciMove,
        'click-prev': null,
        'delete-move': uciMove => !!uciMove,
    },
    data: () => ({
        selectedMoveIndex: null,
    }),
    computed: {
        allMoves() {
            return [...this.bestMoves, ...this.moves]
        }
    },
    methods: {
        formatScore(scoreInCentipawns) {
            if (scoreInCentipawns > 0) {
                return `+${scoreInCentipawns / 100}`
            }
            else return String(scoreInCentipawns / 100)

        },

        handleMoveClicked(uciMove) {
            this.$emit('click-move', uciMove)
        },
        handlePrevClicked() {
            this.$emit('click-prev')
        },
        handleNextClicked() {
            if (!this.allMoves.length) return
            if (this.selectedMoveIndex == null) {
                this.selectedMoveIndex = this.bestMoves.length % this.allMoves.length
            }
            else {
                this.$emit('click-move', this.allMoves[this.selectedMoveIndex].uci)
            }
        },
        selectNextMove(e) {
            if (!this.allMoves.length) return
            e.preventDefault()
            if (this.selectedMoveIndex == null) {
                this.selectedMoveIndex = this.bestMoves.length % this.allMoves.length
            }
            else if (this.selectedMoveIndex + 1 < this.allMoves.length) {
                this.selectedMoveIndex = this.selectedMoveIndex + 1
            }
            else {
                this.selectedMoveIndex = null
            }
        },
        selectPrevMove(e) {
            if (!this.allMoves.length) return
            e.preventDefault()
            if (this.selectedMoveIndex == null && this.allMoves.length) {
                this.selectedMoveIndex = 0
            }
            else if (this.selectedMoveIndex - 1 >= 0) {
                this.selectedMoveIndex = this.selectedMoveIndex - 1
            }
            else {
                this.selectedMoveIndex = null
            }
        },
    },
    watch: {
        allMoves() {
            this.selectedMoveIndex = null
        },
    },
    mounted() {
        Mousetrap.bind('right', this.handleNextClicked)
        Mousetrap.bind('left', this.handlePrevClicked)
        Mousetrap.bind('down', this.selectNextMove)
        Mousetrap.bind('up', this.selectPrevMove)
    },
}
</script>
<style lang="css" scoped>
.moves-table-container {
    border-radius: 4px;
    background-color: rgb(240, 240, 240);
    position: relative;
    min-width: 260px;
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

.moves-table__body>tr.move-row.selected {
    background-color: rgba(255, 240, 81, 0.6);
    cursor: pointer;
}

.moves-table-container__actions {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
}

.v-table .v-table__wrapper>table>tbody>tr:not(:last-child)>td {
    border: none;
}
</style>

<template>
    <v-table class="moves-table">
        <thead class="table-header">
            <tr>
                <th>Move</th>
                <th>Score</th>
            </tr>
        </thead>
        <tbody class="table-body">
            <tr v-for="(moveData, moveName) in moves" :key="moveName" @click.stop="handleMoveClicked(moveName)">
                <td> {{ moveName }} </td>
                <td>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
export default {
    name: 'MovesTable',
    props: {
        moves: {
            type: Object,
            default: () => { }
        },
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
        handleMoveClicked(moveName) {
            this.$emit('click-move', moveName)
        }
    },
}
</script>
<style lang="css" scoped>
.moves-table {
    border-radius: 4px;
    background-color: rgb(237, 237, 237);
    height: 100%;
}

.table-header {
    background-color: rgb(189, 189, 189)
}

.table-body>tr:hover {
    background-color: rgb(222, 222, 222);
    cursor: pointer;
}
</style>

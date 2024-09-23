<template>
    <h1 class="mb-2">Opening Detail</h1>
    <span class="openingTitle mb-2">{{ opening.name }}</span>
    <v-row class="d-flex flex-nowrap">
        <v-col class="d-flex justify-center" style="min-width: 60%">
            <Board style="width: auto; max-height: 80vh;"></Board>
        </v-col>
        <v-col>
            <MovesTable></MovesTable>
        </v-col>
        <!-- <v-col>
        </v-col> -->
    </v-row>


</template>

<script>
import Board from '../components/Board/Board.vue';
import MovesTable from '../components/OpeningDetail/MovesTable.vue';

import api from '../services/Api';
export default {
    components: {
        Board,
        MovesTable,
    },
    name: 'Openings',

    data() {
        return {
            rightBar: false,
            opening: {},
        }
    },
    async mounted() {
        this.opening = await api.fetchOpening(this.$route.params.id)
    },
    methods: {

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
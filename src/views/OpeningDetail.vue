<template>
    <h1 class="mb-2">Opening Detail</h1>
    <span class="openingTitle mb-2">{{ opening.name }}</span>
    <v-row>
        <v-col>
            <Board style="width: auto; max-width: 500px;"></Board>
        </v-col>
        <v-col cols="auto">
            <v-table style="width: 300px">
                <thead>
                    <tr>
                        <th>Move</th>
                        <th> Next Moves</th>
                        <th> Stockfish</th>
                    </tr>

                </thead>
                <tbody>
                    <tr>
                        <td>
                            D4
                        </td>
                        <td>

                        </td>
                        <td>
                            1.43
                        </td>
                    </tr>
                    <tr>
                        <td>
                            D4
                        </td>
                        <td>
                            D5, D6
                        </td>
                        <td>
                            1.43
                        </td>
                    </tr>
                    <tr>
                        <td>
                            D4
                        </td>
                        <td>

                        </td>
                        <td>
                            1.43
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-col>


    </v-row>


</template>

<script>
import Board from '../components/Board/Board.vue';

import api from '../services/Api';
export default {
    components: {
        Board,
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
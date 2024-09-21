<template>
    <h1>Openings</h1>

    <v-row class="mb-0">
        <v-spacer></v-spacer>
        <v-col cols="auto">
            <v-btn variant="text" color="teal-darken-2" @click.stop="rightBar = true">
                <v-icon>mdi-plus</v-icon>
                New Opening
            </v-btn>
        </v-col>
    </v-row>
    <v-text-field class="mb-2" variant="outlined" density="compact" label="Search Opening"
        prepend-inner-icon="mdi-magnify" hide-details>
    </v-text-field>

    <v-table>
        <thead>
            <tr>
                <th></th>
                <th>Name</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="opening in openings" class="cursor-pointer" @click.stop="loadOpening(opening)">
                <td style="width: 60px" class="text-center">
                    <v-icon>mdi-book-open-blank-variant</v-icon>
                </td>
                <td>
                    {{ opening.name }}
                </td>
                <td></td>
                <td class="text-end">
                    <v-btn icon="mdi-pencil" color="blue-darken-2" variant="text"></v-btn>
                    <v-btn icon="mdi-delete" color="red-darken-2" variant="text" :loading="opening.deleting"
                        @click="deleteOpening(opening)">
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
    <v-navigation-drawer location="right" temporary v-model="rightBar" width="400">
        <v-container>
            <h3>New Opening</h3>
            <v-form ref="createOpeningForm" @submit.prevent="createOpening(newOpening)">
                <v-text-field v-model="newOpening.name" label="Name" variant="underlined" />
                <v-btn type="submit" variant="tonal" color="teal-darken-2">Create</v-btn>
            </v-form>
        </v-container>
    </v-navigation-drawer>
</template>

<script>
// import Board from '../components/Board/Board.vue';

import api from '../services/Api';
export default {
    name: 'Openings',
    data() {
        return {
            rightBar: false,
            openings: [],
            newOpening: {}
        }
    },
    async mounted() {
        this.openings = await api.fetchOpenings()
    },
    methods: {
        async createOpening(opening) {
            try {
                const createdOpening = await api.createOpening(opening)
                this.openings.push(createdOpening)
            } catch (e) {
                console.error("Error al borrar opening", e)
            }
            this.rightBar = false
        },

        async deleteOpening(opening) {
            opening.deleting = true
            try {
                await api.deleteOpening(opening.id)
                this.openings = this.openings.filter(o => o.id !== opening.id);
            } catch (e) {
                console.error("Error al borrar opening", e)
            }
            opening.deleting = false
        },

        loadOpening(opening) {
            this.$router.push({ name: "Opening Detail", params: { id: opening.id } })
        }
    }
};
</script>
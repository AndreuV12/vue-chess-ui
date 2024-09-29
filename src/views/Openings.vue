<template>
    <h1 class="mb-8">Openings</h1>
    <v-row class="mb-0" style="font-size: 0.875rem; opacity: 0.8">
        <v-col cols="auto" class="d-flex align-center">
            <TextFieldDebounced v-model="filters.name" variant="outlined" density="compact" label="Search by Name"
                prepend-inner-icon="mdi-magnify" min-width="210px" hide-details>
            </TextFieldDebounced>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="auto" class="d-flex align-center">
            <v-btn variant="text" color="teal-darken-2" @click.stop="rightBar = true">
                <span style="font-weight: bold;">New Opening</span>
            </v-btn>
        </v-col>
        <v-col cols="auto" class="d-flex align-center">
            <span style="width: 100px;">{{ `${firstOfPage}-${lastOfPage} of ${total}` }}</span>
        </v-col>
        <v-col cols="auto">
            <v-pagination v-model="pagination.page" :length="pagetotal" size="small" total-visible="3"></v-pagination>
        </v-col>
    </v-row>
    <v-table class="mb-4" height="400px" v-if="openings.length">
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
                    <v-btn icon="mdi-pencil" color="blue-darken-2" variant="text" @click.stop=""></v-btn>
                    <v-btn icon="mdi-delete" color="red-darken-2" variant="text" :loading="opening.deleting"
                        @click.stop="deleteOpening(opening)">
                    </v-btn>
                </td>
            </tr>
        </tbody>
    </v-table>
    <div v-else class="no-openings-message">
        <p class="pb-4">No openings stored yet</p>
        <v-btn variant="text" color="teal-darken-2" @click.stop="rightBar = true">
            <span style="font-weight: bold;">Create a new one!</span>
        </v-btn>
    </div>
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
import TextFieldDebounced from '../components/common/TextFieldDebounced.vue';

import api from '../services/Api';
export default {
    components: {
        TextFieldDebounced,
    },
    name: 'Openings',
    data() {
        return {
            rightBar: false,
            openings: [],
            total: 0, // Openings total
            pagination: {
                page: 1,
                limit: 5
            },
            filters: {
                name: null
            },
            newOpening: {},

        }
    },
    async mounted() {
        await this.fetchOpenings()
    },

    computed: {
        pagetotal() {
            return Math.ceil(this.total / this.pagination.limit)
        },
        firstOfPage() {
            return (this.pagination.page - 1) * this.pagination.limit + 1
        },
        lastOfPage() {
            return Math.min(this.firstOfPage + this.pagination.limit - 1, this.total)
        }
    },

    watch: {
        'pagination.page'() {
            this.fetchOpenings()
        },
        filters: {
            handler() {
                this.fetchOpenings()
            },
            deep: true
        }
    },
    methods: {
        async fetchOpenings() {
            const params = {
                ...this.filters,
                ...this.pagination
            }
            console.log("fetch", params);
            const { openings, total } = await api.fetchOpenings(params)
            this.openings = openings
            this.total = total
        },
        async createOpening(opening) {
            try {
                const createdOpening = await api.createOpening(opening)
                this.openings.push(createdOpening)
                this.total++
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
<style>
.no-openings-message {
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin: 20px auto;
    max-width: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
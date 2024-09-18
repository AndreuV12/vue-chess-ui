<template>
    <!-- <v-app-bar flat> -->
    <v-app-bar app elevation="1">
        <v-app-bar-nav-icon @click.stop="toggleSidebar()"></v-app-bar-nav-icon>
        <v-app-bar-title @click="$router.push('/')" style="cursor: pointer">Chess Studio</v-app-bar-title>
        <v-menu v-if="store.user">
            <template v-slot:activator="{ props }">
                <v-btn prepend-icon="mdi-account-circle" v-bind="props">{{ store.user.email }}</v-btn>
            </template>
            <v-list>
                <v-list-item @click="logout()">
                    <v-list-item-title><v-icon icon="mdi-logout" start></v-icon>Logout</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
import { useStore } from '../store/store';
export default {
    data() {
        return {
            store: useStore()
        }
    },

    mounted() {
    },

    methods: {
        toggleSidebar() {
            this.$emit('toggleSidebar')
        },
        logout() {
            this.store.user = null
            localStorage.removeItem('accessToken')
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>
<style></style>
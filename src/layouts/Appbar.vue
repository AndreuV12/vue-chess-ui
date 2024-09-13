<template>
    <!-- <v-app-bar flat> -->
    <v-app-bar app elevation="1">
        <v-app-bar-nav-icon @click.stop="toggleSidebar()"></v-app-bar-nav-icon>
        <v-app-bar-title @click="$router.push('/')" style="cursor: pointer">Chess Studio</v-app-bar-title>
    </v-app-bar>
</template>

<script>

export default {
    data() {
        return {
        }
    },

    mounted() {
    },

    methods: {
        toggleSidebar() {
            this.$emit('toggleSidebar')
        }
    }
}
</script>
<style></style>
<!-- src/App.vue -->
<template>
  <v-app>
    <Appbar @toggleSidebar="sidebar = !sidebar" />
    <Sidebar v-model="sidebar" />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import Appbar from './layouts/Appbar.vue'
import Sidebar from './layouts/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Appbar,
    Sidebar,
  },
  data() {
    return {
      sidebar: true
    }
  },
};
</script>
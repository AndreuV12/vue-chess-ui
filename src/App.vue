<!-- src/App.vue -->
<template>
  <v-app>
    <template v-if="showLayout">
      <Appbar @toggleSidebar="sidebar = !sidebar" />
      <Sidebar v-model="sidebar" />
    </template>
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
  computed: {
    showLayout() {
      return !(this.$route.name === 'Login' || this.$route.name === 'Register');
    }
  },
};
</script>
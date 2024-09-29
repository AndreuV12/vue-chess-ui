<template>
  <v-app>
    <template v-if="showLayout">
      <Appbar @toggleSidebar="toggleSidebar" />
      <Sidebar v-model="sidebar" />
    </template>
    <v-main>
      <v-container fluid class="pa-8 px-16 pb-16">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Mousetrap from 'mousetrap';

import Appbar from './layouts/Appbar.vue'
import Sidebar from './layouts/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Appbar,
    Sidebar,
    Mousetrap,
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
  methods: {
    toggleSidebar() {
      this.sidebar = !this.sidebar
    }
  },
  mounted() {
    Mousetrap.bind('[', this.toggleSidebar);
  },
};
</script>
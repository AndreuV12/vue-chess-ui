import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Openings from '../views/Openings.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/openings',
    name: 'Openings',
    component: Openings
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes
});

export default router;

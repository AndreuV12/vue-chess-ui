import { createRouter, createWebHistory } from "vue-router";
import { isAuthenticated } from "../services/Auth";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Openings from "../views/Openings.vue";

const publicRouteNames = ["Login", "Register"];

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/openings",
    name: "Openings",
    component: Openings,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

router.beforeEach((to, _from, next) => {
  if (publicRouteNames.includes(to.name) || isAuthenticated()) {
    next();
  } else {
    next({ name: "Login" });
  }
});

export default router;

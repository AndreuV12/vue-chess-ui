import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

import router from "./router";

import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { createPinia } from "pinia";

const vuetify = createVuetify({});
const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount("#app");

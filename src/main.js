import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import router from './router'

import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css' 

// Importa el tema de Vuetify
const vuetify = createVuetify({
  // Opcional: configuración de temas, componentes personalizados, etc.
})

const app = createApp(App)
app.use(router)
app.use(vuetify)

app.mount('#app')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // Agrega el plugin de Vuetify
  ],
  server: {
    port: 3000, // Cambia el puerto a 3000 o el que prefieras
  }
})

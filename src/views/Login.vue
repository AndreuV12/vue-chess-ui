<template>
    <v-container class="d-flex justify-center align-center" style="height: 100vh;">
        <v-form ref="form" validateOn="blur" @submit.prevent="submit">
            <v-card class="pa-5" min-width="500">
                <v-card-title class="d-flex justify-center mb-2">Iniciar sesión</v-card-title>
                <v-card-text>
                    <v-text-field v-model="username" id="username" name="username" autocomplete="username"
                        :rules="usernameRules" label="Usuario" prepend-icon="mdi-account" class="mb-2"></v-text-field>
                    <v-text-field v-model="password" id="password" name="password" autocomplete="current-password"
                        :rules="passwordRules" label="Contraseña" type="password"
                        prepend-icon="mdi-lock"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Entrar</v-btn>
                    <v-btn text color="secondary" @click="goToRegister">Registrarse</v-btn> <!-- Botón de registro -->
                </v-card-actions>
                <v-alert v-if="errorMessage" class="error-alert ma-3">
                    {{ errorMessage }}
                </v-alert>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
import api from '../services/Api'
import { useStore } from '../store/store';
import { getUser } from '../services/Auth';
export default {
    data() {
        return {
            store: useStore(),
            username: '',
            password: '',
            errorMessage: null,
            required: v => !!v || 'El correo electrónico es requerido',
            usernameRules: [
                v => !!v || 'El nombre de usuario es requerido',
            ],
            passwordRules: [
                v => !!v || 'La contraseña es requerida',
                v => v.length >= 6 || 'La contraseña debe tener al menos 6 caracteres'
            ]
        }
    },
    methods: {
        async submit() {
            const isValid = await this.$refs.form?.validate().then(({ valid }) => (valid))
            if (!isValid) return
            try {
                await api.login(this.username, this.password); // get token from api
                this.store.user = getUser()
                this.$router.push({ name: 'Home' })
            }
            catch (error) {
                if (error.response?.data?.detail) {
                    this.errorMessage = error.response.data.detail
                }
                else {
                    this.errorMessage = 'Error al iniciar session';
                }
            }
        },
        goToRegister() {
            this.$router.push({ name: 'Register' });
        }
    }
}
</script>

<style scoped>
.v-card {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.error-alert {
    border: 1px solid #f44336;
    /* Color del borde para alertas de error */
    border-radius: 4px;
    /* Bordes redondeados */
    padding: 16px;
    /* Espaciado interno */
    background-color: #ffebee;
    /* Color de fondo más suave */
    color: #f44336;
    /* Color del texto */
}
</style>

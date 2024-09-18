<template>
    <v-container class="d-flex justify-center align-center" style="height: 100vh;">
        <v-form ref="form" validateOn="blur" @submit.prevent="submit">
            <v-card class="pa-5" min-width="500">
                <v-card-title class="d-flex justify-center mb-2">Registrarse</v-card-title>
                <v-card-text>
                    <v-text-field v-model="username" :rules="usernameRules" label="Usuario" prepend-icon="mdi-account"
                        class="mb-2"></v-text-field>
                    <v-text-field v-model="email" :rules="emailRules" label="Correo Electrónico"
                        prepend-icon="mdi-email" class="mb-2"></v-text-field>
                    <v-text-field v-model="password" :rules="passwordRules" label="Contraseña" type="password"
                        prepend-icon="mdi-lock"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" type="submit">Registrar</v-btn>
                    <v-btn text color="secondary" @click="goToLogin">Iniciar sesión</v-btn>
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
import { jwtDecode } from 'jwt-decode'
export default {
    data() {
        return {
            store: useStore(),
            username: '',
            email: '',
            password: '',
            errorMessage: null,
            usernameRules: [
                v => !!v || 'El nombre de usuario es requerido',
            ],
            emailRules: [
                v => !!v || 'El correo electrónico es requerido',
                v => /.+@.+\..+/.test(v) || 'Debe ser un correo electrónico válido',
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
                const { access_token: accessToken } = await api.signup(this.username, this.email, this.password);
                localStorage.setItem('accessToken', accessToken);
                const { sub: username, email } = jwtDecode(accessToken);
                this.store.user = { username, email }
                this.$router.push({ name: 'Home' })
            }
            catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        this.errorMessage = error.response.data.detail
                    }
                    else {
                        this.errorMessage = 'Error de red. Inténtalo de nuevo.';
                    }
                }
                else {
                    console.error(error)
                }
            }
        },
        goToLogin() {
            this.$router.push({ name: 'Login' });
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

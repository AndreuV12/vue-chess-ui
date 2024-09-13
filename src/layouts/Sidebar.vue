<template>
    <v-navigation-drawer app permanent v-model="localValue" width="200">
        <v-list dense>
            <v-list-item title="Home" prepend-icon="mdi-home" to="/"></v-list-item>
            <v-list-item title="Openings" prepend-icon="mdi-briefcase" to="openings"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
export default {
    name: "Sidebar",
    props: {
        modelValue: {
            type: Boolean,
            default: true, // El sidebar comienza abierto
        },
    },
    computed: {
        // Computed para manejar el valor local basado en el prop modelValue
        localValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                // Emitimos el evento update:modelValue para reflejar el cambio en el componente padre
                this.$emit("update:modelValue", value);
            },
        },
    },
};
</script>
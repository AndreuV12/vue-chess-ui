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
        localValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
    },
};
</script>
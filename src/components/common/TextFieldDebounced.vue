<template>
    <v-text-field :label="label" :density="density" :variant="variant" :clearable="clearable" v-model="internalValue"
        :disabled="disabled" :placeholder="placeholder" :prepend-inner-icon="prependInnerIcon" />
</template>

<script>
export default {
    name: 'DebouncedTextField',
    props: {
        label: {
            type: String,
        },
        density: {
            type: String,
        },
        variant: {
            type: String,
            default: 'outlined' // Ejemplo de variante predeterminada
        },
        clearable: {
            type: Boolean,
            default: true // Permitir borrar el campo si es true
        },
        disabled: {
            type: Boolean,
            default: false // Propiedad para deshabilitar el campo si es true
        },
        placeholder: {
            type: String,
        },
        debounceTime: {
            type: Number,
            default: 1000
        },
        prependInnerIcon: {
            type: String
        },
        modelValue: {
            type: String,
            default: '' // El valor inicial pasado al componente
        }
    },
    data() {
        return {
            internalValue: this.modelValue, // Sincroniza el valor inicial
            timeout: null // Guarda el ID del setTimeout
        };
    },
    watch: {
        internalValue() {
            this.updateValueDebounced();
        },
        modelValue(val) {
            this.internalValue = val;
        }
    },
    methods: {
        updateValueDebounced() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.$emit('update:modelValue', this.internalValue);
            }, this.debounceTime);
        }
    }
};
</script>
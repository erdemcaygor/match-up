<template>
    <button v-bind:class="getClass(type)" v-on:click="onButtonClick">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: "Button",
    props: {
        type: {
            type: String,
            default: 'default'
        }
    },
    methods: {
        getClass: (type) => {
            return `btn btn-${type}`;
        },
        onButtonClick(e) {
            this.$emit('onClick', e);
        }
    }
}
</script>
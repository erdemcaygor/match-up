<template>
    <div class="card" v-bind:class="{active: opened}"  v-on:click="onCardClick">
        <img src="../../static/SVG/check.svg" alt="check" class="card__check" v-bind:class="{matched: matched}" />
        <div class="card__front-container" v-bind:class="{active: !opened}">
            <slot name="front"></slot>
        </div>
        <div  class="card__back-container" v-bind:class="{active: opened}">
            <slot name="back"></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "Card",
    props: {
        status: {
            default: 'close'
        },
        id: {
            type: Number,
            default: 1
        },
        opened: {
            type: Boolean,
            default: false
        },
        matched: {
            type: Boolean,
            default: false
        }
    },
    data: function() {
        return {
        }
    },
    methods: {
        onCardClick() {
            const cardId = this.id;
            if (!this.opened) {
                this.$emit('onCardClicked', {cardId});
            }
        }
    },
    computed: {
        getCardStatus() {
            return this.opened;
        }
    }
}
</script>
<template>
    <div class="modal" v-bind:class="{animationComplete: this.showDialog || type === 'failed'}">
        <div v-bind:class="{show: this.showDialog || type === 'failed'}" class="modal__dialog">
            <img v-if="type === 'success'" src="../../static/SVG/smile.svg" alt="smile" class="modal__img" />
            <img v-if="type === 'failed'" src="../../static/SVG/sad.svg" alt="sad" class="modal__img" />
            <span v-if="type === 'success'" class="modal__description">
                Oyunu başarıyla tamamladınız!
            </span>
            <span v-if="type === 'failed'" class="modal__description">
                Süre doldu!
            </span>
            <div class="modal__button">
                <custom-button @onClick="onButtonClick" type="primary">Yeniden Oyna</custom-button>
            </div>
        </div>
    </div>
</template>
<script>
import confetti from 'canvas-confetti';

export default {
    name: "Modal",
    props: {
        type: {
            type: String,
            default: 'success'
        }
    },
    data() {
        return {
            showDialog: false
        }
    },
    created() {
        if (this.type === 'success') {
            this.createConfetti();
        }
    },
    methods: {
        getRandomNumberInRange(min, max) {
                return Math.random() * (max - min) + min;
        },
        createConfetti() {
            const duration = 10 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const interval = setInterval(() => {
            let timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                this.toggleDialog();
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: this.getRandomNumberInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: this.getRandomNumberInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
            }, 250);
        },
        toggleDialog() {
            this.showDialog = !this.showDialog;
        },
        onButtonClick(e) {
            this.$emit('restartGame', e);
        }
    }
}
</script>
<template>
    <div class="timer">
        <img class="timer__image" src="../../static/SVG/stopwatch.svg" />
        <span class="timer__value">
            {{timer}}
        </span>
    </div>
</template>

<script>
export default {
    name: "Timer",
    props: {
        type: {
            type: String,
            default: 'default'
        },
        duration: {
            type: Number,
            default: 300
        },
        bus: {
            type: Object
        }
    },
    data() {
        return {
            timerInterval: null,
            timer: null
        }
    },
    created() {
        this.startTimer();
    },
    mounted() {
        this.bus.$on('restartTimer', this.startTimer);
    },
    methods: {
        startTimer() {
            let time = this.duration;
            let minutes, seconds;
            if (this.timerInterval) clearInterval(this.timerInterval);
            this.timerInterval = setInterval(() => {
                minutes = parseInt(time / 60, 10);
                seconds = parseInt(time % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                this.timer= minutes + ":" + seconds;

                if (--time < 0) {
                    if (this.timerInterval) clearInterval(this.timerInterval);
                    this.$emit('onTimeIsUp', {});
                }
            }, 1000);
        }
    }
}
</script>
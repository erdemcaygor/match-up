<template>
  <div class="container">
      <div class="content">
        <main class="main">
          <div class="timer-container">
            <timer @onTimeIsUp="timeIsUp" :bus="bus"></timer> 
          </div>
          <container>
            <card v-for="data in gameInitData" 
                  :opened="openedCards.indexOf(data.index) > -1 || matchedCards.indexOf(data.index) > -1" 
                  :key="data.index" 
                  :matched="matchedCards.indexOf(data.index) > -1"
                  @onCardClicked="() => cardClicked(data)">
              <div slot="front">
              </div>
              <div slot="back" class="icon-container">
                <svg class="icon-container__icon">
                  <use :xlink:href="require('./static/sprite.svg') + `#${data.imageId}`"></use>
                </svg>
              </div>
            </card>
          </container>
        </main>
      </div>
      <div v-if="gameCompleteSuccess || gameFailed">
        <modal @restartGame="restartGame" :type="gameFailed === true ? 'failed' : 'success'"></modal>
      </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "app",
  data() {
    return {
      gameInitData: [],
      openedCards: [],
      matchedCards: [],
      gameCompleteSuccess: false,
      gameFailed: false,
      bus: new Vue(),
    };
  },
  created() {
    this.createGame();
  },
  methods: {
    createGame() {
        const initArrUnit = [...Array(17).keys()].slice(1);
        const initArr = [...initArrUnit, ...initArrUnit];
        
        for (let i = initArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = initArr[i];
          initArr[i] = initArr[j];
          initArr[j] = temp;
        }

        initArr.map((data, index) => {
          this.gameInitData.push({imageId: data, opened: false, matched: false, index: index});
        });
    },
    cardClicked(data) {
      const { index, imageId } = data;
      if(this.openedCards.length >= 2) {
        return;
      }
      this.openedCards.push(index);
      if (this.openedCards.length === 2) {
        setTimeout(() => {
          this.matchCards(imageId);
        }, 750);
      }
    },
    matchCards(imageId) {
      if (imageId === this.gameInitData[this.openedCards[0]].imageId) {
          this.matchedCards = [...this.matchedCards, ...this.openedCards];
          if (this.matchedCards.length === this.gameInitData.length) {
            this.gameCompleteSuccess = true;
          }
      }
      this.openedCards = [];
    },
    restartGame(e) {
      this.gameCompleteSuccess = false;
      this.gameFailed = false;
      this.openedCards = [];
      this.matchedCards = [];
      this.gameInitData = [];
      this.createGame();
      this.bus.$emit("restartTimer");
    },
    timeIsUp() {
      this.gameFailed = true;
    }
  }
};
</script>

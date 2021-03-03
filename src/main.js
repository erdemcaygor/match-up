import Vue from "vue";
import App from "./App.vue";
import "./scss/main.scss";
require("./components");

new Vue({
  el: "#app",
  render: (h) => h(App),
});

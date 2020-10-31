import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import api from "@/api";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

api.login(); //TODO: Temporary solution to always be logged in into hardcoded demo user. Remove later when login is done
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

Vue.prototype.$baseURL = "localhost:8080"; // TODO: Find a more suitable place for this config

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

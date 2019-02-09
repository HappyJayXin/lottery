import Vue from "vue";
import App from "./App.vue";
import iView from "iview";
import "iview/dist/styles/iview.css";
import "vue2-animate/dist/vue2-animate.min.css";

Vue.config.productionTip = false;
Vue.use(iView);

new Vue({
  render: h => h(App)
}).$mount("#app");

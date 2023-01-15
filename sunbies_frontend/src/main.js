import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// https://vee-validate.logaretm.com/v2/guide/rules.html#after-params
/*
alpha_num : 검증 중인 필드에는 영문자 또는 숫자가 포함될 수 있습니다.
*/
import VeeValidate from "vee-validate";
// VeeValidate에서 한글로 오류 설명해줌
import ko from "vee-validate/dist/locale/ko.js";

Vue.use(VeeValidate, {
  // This is the default
  inject: true,
  // Important to name this something other than 'fields'
  fieldsBagName: "veeFields",
  // This is not required but avoids possible naming conflicts
  errorBagName: "veeErrors",
  // 오류에서 한글 사용
  locale: "ko",
  dictionary: {
    ko,
  },
});

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

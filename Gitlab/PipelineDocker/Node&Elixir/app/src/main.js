import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import SuiVue from 'semantic-ui-vue'
import VueCookies from 'vue-cookies'
import Fragment from 'vue-fragment'
import VueEllipseProgress from 'vue-ellipse-progress';


Vue.config.productionTip = false;

Vue.use(VueAxios, axios);
axios.defaults.baseURL = process.env.VUE_APP_API;

Vue.use(SuiVue);
Vue.use(VueCookies)
Vue.use(Fragment.Plugin)
Vue.use(VueEllipseProgress);

new Vue({
  router,
  store,
  render: h => h(App),
  axios
}).$mount('#app');

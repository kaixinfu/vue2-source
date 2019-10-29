import Vue from 'vue'
import App from './App.vue'
import Bus from './utils/bus';
import router from './routes';

Vue.config.productionTip = false;
// 组件通信，总线模式
Vue.prototype.$bus = new Bus();
console.log('.....mian.js', Vue.prototype);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

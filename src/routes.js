import Vue from 'vue';
// import Router from 'vue-router';
import Router from './utils/vue-router';
import B from './components/luyou/B';
import C from './components/luyou/C';
Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', component: B },
    { path: '/C', component: C },
  ]
})

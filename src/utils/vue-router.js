let Vue;
export default class VueRouter {
  constructor(options) {
    console.log('options', options);
    this.$options = options;
    this.routerMap = {};
    this.app = new Vue({
      data: {
        path: '/'
      }
    })
  }
  init() {
    this.bindEvents();
    this.createRouteMap();
    this.initComponents();
  }
  bindEvents() {
    window.addEventListener('load', this.onhashchange.bind(this), false);
    window.addEventListener('hashchange', this.onhashchange.bind(this), false);
  }
  onhashchange() {
    this.app.path = window.location.hash.slice(1) || "/";
    console.log('this.app.path', this.app.path);
  }
  createRouteMap() {
    this.$options.routes.forEach(route => {
      this.routerMap[route.path] = route
    })
    console.log('this.routerMap', this.routerMap);
  }
  initComponents() {
    Vue.component('router-link', {
      props: {
        to: String
      },
      render(createElement, context) {
        return createElement('a', {
          attrs: {
            href: '#' + this.to
          }
        }, [this.$slots.default])
      }
    })
    Vue.component('router-view', {
      render: (createElement, context) => {
        console.log('routerMap', this.routerMap);
        console.log('Vue.prototype.$router', Vue.prototype.$router);
        console.log('this.app.path', this.app.path);
        return createElement(this.routerMap[this.app.path].component)
      }
    })
  }
}

VueRouter.install = (_vue) => {
  Vue = _vue;
  Vue.mixin({
    beforeCreate() {
      if (this.$options && this.$options.router) {
        Vue.prototype.$router = this.$options.router;
        this.$options.router.init();
      }
    }
  })
}

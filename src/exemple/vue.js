class Vue {
  constructor(options) {
    this.$options = options;
    this.$data = options.data;
    this.observe(this.$data);
    new Compiler(options.el, this);
    this.$options.created && this.$options.created.call(this);
  }
  observe(obj) {
    if (!obj || typeof obj !== 'object') {
      return
    }
    Object.keys(obj).forEach(key => {
      this.defineReactive(obj[key], key, obj);
      this.proxyData(key);
    })
  }
  defineReactive(value, key, obj) {
    this.observe(value);
    var dep = new Dep();
    Object.defineProperty(obj, key, {
      get: function() {
        if (Dep.target) {
          dep.addDep(Dep.target)
        }
        return value
      },
      set: function(val) {
        if (val === value) {
          return
        }
        value = val;
        dep.notify();
      }
    })
  }
  // 将data上的属性值代理到当前vue实例上
  proxyData(key) {
    Object.defineProperty(this, key, {
      get: function() {
        return this.$data[key]
      },
      set: function(val) {
        this.$data[key] = val;
      }
    })
  }
}

class Dep {
  constructor() {
    this.deps = [];
  }
  addDep(dep) {
    this.deps.push(dep)
  }
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

class Watcher {
  constructor(vm, key, fn) {
    this.vm = vm;
    this.key = key;
    this.fn = fn;
    Dep.target = this;
    this.vm[this.key];
    Dep.target = null
  }
  update() {
    console.log(`${this.key}赋值了....`)
    this.fn.call(this.vm, this.vm[this.key]);
  }
}

class Compiler {
  constructor(el, vue) {
    this.el = el;
    this.vue = vue;
    this.compiler(document.querySelector(el));
  }
  compiler(node) {
    let nodes = Array.from(node.childNodes);
    // console.log('nodes', nodes);
    nodes.forEach(node => {
      if (this.isElement(node)) {
        // console.log('元素节点', node.nodeName)
        this.compilerElement(node);
      } else if (this.isInterpolation(node)) {
        this.compilerText(node);
      }
      // 递归子节点
      if (node.childNodes && node.childNodes.length > 0) {
        this.compiler(node);
      }
    })
  }
  isElement(node) {
    return node.nodeType === 1
  }
  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compilerText(node) {
    this.update(node, RegExp.$1, 'text');
  }
  compilerElement(node) {
    //获取节点属性
    let nodeAttrs = node.attributes;
    Array.from(nodeAttrs).forEach(attr => {
      let _name = attr.nodeName;
      let _value = attr.nodeValue;
      if (this.isDirective(_name)) {
        this.compilerDirective(node, _value, _name.substring(2))
      } else if (this.isEvent(_name)) {
        this.compilerEvent(node, _name.substring(1), _value)
      }
    })
  }
  isDirective(key) {
    return key.indexOf('v-') > -1
  }
  isEvent(key) {
    return key.indexOf('@') > -1
  }
  compilerDirective(node, key, type) {
    this.update(node, key, type)
  }
  compilerEvent(node, eventName, eventFn) {
    let fn = this.vue.$options.methods && this.vue.$options.methods[eventFn];
    if (fn) {
      node.addEventListener(eventName, fn.bind(this.vue))
    }
  }
  update(node, key, type) {
    let updaterFn = this[`${type}Update`];
    if (updaterFn) {
      updaterFn.call(this.vue, node, this.vue.$data[key]);
    }
    new Watcher(this.vue, key, function (val) {
      updaterFn && updaterFn.call(this.vue, node, val)
    })
  }
  textUpdate(node, value) {
    node.textContent = value;
  }
  htmlUpdate(node, value) {
    node.innerHTML = value;
  }
  modelUpdate(node, value) {
    let _key = node.getAttribute('v-model');
    node.addEventListener('input', (val) => {
      if (this) {
        this.$data[_key] = val.target.value;
      }
    })
  }
}

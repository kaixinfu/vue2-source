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
      }
    })
  }
  isDirective(key) {
    return key.indexOf('v-') > -1
  }
  compilerDirective(node, key, type) {
    this.update(node, key, 'text')
  }
  update(node, key, type) {
    let updaterFn = this[`${type}Update`];
    if (updaterFn) {
      updaterFn(node, this.vue.$data[key]);
    }
    new Watcher(this.vue, key, function (val) {
      updaterFn && updaterFn(node, val)
    })
  }
  textUpdate(node, value) {
    node.textContent = value;
  }
}

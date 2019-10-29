export default class Bus {
  constructor() {
    this.callbacklist = {}
  }
  $on(key, callback) {
    this.callbacklist[key] = this.callbacklist[key] || [];
    this.callbacklist[key].push(callback)
  }
  $emit(key, args) {
    if (this.callbacklist[key]) {
      this.callbacklist[key].forEach(cb => {
        cb(args)
      })
    }
  }
}

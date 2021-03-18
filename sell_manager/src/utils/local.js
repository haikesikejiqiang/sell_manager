export default {
  get(key) {
    return window.localStorage.getItem(key)
  },
  set(key, val) {
    window.localStorage.setItem(key, val)
  },
  cls() {
    window.localStorage.clear()
  }
}

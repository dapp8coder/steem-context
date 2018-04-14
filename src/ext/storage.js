/**
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage}
 */
export default {
  get (key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) || fallback
    } catch (e) {
      return fallback
    }
  },
  set (key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (e) {}
  },
  remove (key) {
    try {
      localStorage.removeItem(key)
    } catch (e) {}
  },
  clear () {
    try {
      localStorage.clear()
    } catch (e) {}
  }
}

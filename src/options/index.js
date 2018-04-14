import Vue from 'vue'
import options from './options.vue'
Vue.config.productionTip = false

// used in Vue rendering
Vue.prototype.__ = chrome.i18n.getMessage

new Vue({ // eslint-disable-line no-new
  el: '#root',
  render: h => h(options)
})

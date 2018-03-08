import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueLoading from 'vuex-loading'

window.axios = require('axios');

Vue.use(Vuex)
Vue.use(VueLoading)
Vue.use(require('vue-shortkey'))

Vue.component('icon', require('./components/lib/icon.vue').default);
Vue.component('btooltip', require('./components/lib/btooltip.vue').default);
Vue.component('bbutton', require('./components/lib/bbutton.vue').default);
Vue.component('bbuttons', require('./components/lib/bbuttons.vue').default);
Vue.component('binput', require('./components/lib/binput.vue').default);
Vue.component('boption', require('./components/lib/boption.vue').default);
Vue.component('bselect', require('./components/lib/bselect.vue').default);
Vue.component('bdatepicker', require('./components/lib/bdatepicker.vue').default);

Vue.config.productionTip = false

import helper from './store/modules/helper'
const store = new Vuex.Store({
  modules: {
    helper
  },
});

new Vue({
  store: store,

  vueLoading: new VueLoading({ useVuex: true, moduleName: 'loading' }),

  mounted(){
    this.$loading.startLoading('teste')

    this.$store.dispatch('LOAD_HELPS')
  },

  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueLoading from 'vuex-loading'
import VueRouter from 'vue-router'

window.axios = require('axios');

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueLoading)
Vue.use(require('vue-shortkey'))

import router from './routes';

Vue.component('icon', require('./components/lib/icon.vue').default);
Vue.component('btooltip', require('./components/lib/btooltip.vue').default);
Vue.component('bbutton', require('./components/lib/bbutton.vue').default);
Vue.component('bbuttons', require('./components/lib/bbuttons.vue').default);
Vue.component('binput', require('./components/lib/binput.vue').default);
Vue.component('boption', require('./components/lib/boption.vue').default);
Vue.component('bselect', require('./components/lib/bselect.vue').default);
Vue.component('bdatepicker', require('./components/lib/bdatepicker.vue').default);
Vue.component('btoast', require('./components/lib/btoast.vue').default);
Vue.component('bcard', require('./components/lib/bcard.vue').default);
Vue.component('bmodal', require('./components/lib/bmodal.vue').default);
Vue.component('bdialog', require('./components/lib/bdialog.vue').default);
Vue.component('bmenu', require('./components/lib/bmenu.vue').default);
Vue.component('bnav-dropdown', require('./components/lib/bnav-dropdown.vue').default);
Vue.component('bnav-item', require('./components/dependencies/bnav-item.vue').default);
Vue.component('bsidemenu', require('./components/lib/bsidemenu.vue').default);
Vue.component('bpanel-link', require('./components/lib/bpanel-link.vue').default);

Vue.config.productionTip = false

import helper from './store/modules/helper'
const store = new Vuex.Store({
  modules: {
    helper
  },
});

new Vue({
  store: store,

  router: router,

  vueLoading: new VueLoading({ useVuex: true, moduleName: 'loading' }),

  mounted(){
    this.$loading.startLoading('teste')

    this.$store.dispatch('LOAD_HELPS')
  },

  render: h => h(App)
}).$mount('#app')

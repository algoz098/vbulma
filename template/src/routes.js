import VueRouter from 'vue-router';

let routes = [
  {
    path: '/',
    component: require('./views/home.vue'),
    name: 'home',
    meta: {
      title: 'Home',
      caminho: ['home'],
    },
  },
]

export default new VueRouter({
  // mode: 'history',
  routes
})

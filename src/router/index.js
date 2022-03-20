import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Town from '../views/Town.vue';
import CharSelect from '../views/CharSelect.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/town',
    name: 'Town',
    component: Town
  },
  {
    path: '/char-select',
    name: 'CharSelect',
    component: CharSelect
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

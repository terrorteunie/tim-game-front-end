import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Town from '../views/Town.vue';
import CharSelect from '../views/CharSelect.vue';
import CharCreate from '../views/CharCreate.vue';

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
    path: '/char-create',
    name: 'CharCreate',
    component: CharCreate
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token') === null && to.name !== 'Login') {
        next({name: 'Login'});
        return;
    }
    next();
})

export default router

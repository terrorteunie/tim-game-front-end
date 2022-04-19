import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Town from '../views/Town.vue';
import CharSelect from '../views/CharSelect.vue';
import CharCreate from '../views/CharCreate.vue';
import Leaderboards from '../views/Leaderboards.vue';
import Inventory from '../views/Inventory.vue';
import Wilderness from '../views/Wilderness.vue';
import AssignAttributes from '../views/AssignAttributes.vue';
import store from '../store';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/:charId/town',
        name: 'Town',
        component: Town
    },
    {
        path: '/:charId/leaderboards',
        name: 'Leaderboards',
        component: Leaderboards
    },
    {
        path: '/:charId/inventory',
        name: 'Inventory',
        component: Inventory
    },
    {
        path: '/:charId/wilderness/:distance',
        name: 'Wilderness',
        component: Wilderness
    },
    {
        path: '/charSelect',
        name: 'CharSelect',
        component: CharSelect
    },
    {
        path: '/charCreate',
        name: 'CharCreate',
        component: CharCreate
    },
    {
        path: '/:charId/assignAttributes',
        name: 'AssignAttributes',
        component: AssignAttributes,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if (localStorage.getItem('token') === null && to.name !== 'Login') {
        next({ name: 'Login' });
        return;
    }
    if (store.getters.getCharacters.length === 0 && to.name !== 'CharSelect') {
        next({ name: 'CharSelect' });
        return;
    }
    next();
})

export default router

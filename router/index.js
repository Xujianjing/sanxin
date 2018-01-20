import Vue from 'vue';
import Router from 'vue-router';
import admin from '../components/user/index.vue';
import login from '../components/login/login.vue';
import entry from '../components/user/main/pluponform/entry/entry.vue';
import publics from '../components/user/main/pluponform/public/public';
import grid from '../components/user/main/pluponform/grid/grid.vue';
import {getCookie} from '../utils/utils';
Vue.use(Router);
let router = new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: login
        },
        {
            path: '/admin',
            name: 'admin',
            component: admin,
            children: [
                {
                    path: 'menu/entry',
                    name: 'entry',
                    component: entry
                },
                {
                    path: 'menu/grid',
                    name: 'grid',
                    component: grid
                },
                {
                    path: 'menu/public',
                    name: 'public',
                    component: publics
                }
            ]
        }
    ]
});
router.beforeEach((to, from, next) => {
    if (to.name !== 'login') {
        if (getCookie()) {
            next();
        } else {
            next({
                name: 'login'
            });
        }
    } else {
        next();
    }
});
export default router;

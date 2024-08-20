// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import Home from '../views/HomeView.vue';

// Vue.use(VueRouter);

// const routes = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Home,
//     },
//     // Ovdje možete dodati druge rute
// ];

// const router = new VueRouter({
//     mode: 'history',
//     base: process.env.BASE_URL,
//     routes,
// });

// export default router;
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

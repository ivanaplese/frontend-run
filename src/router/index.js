
import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/HomeView.vue';

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue"; // Pretpostavljam da postoji i SignupView


const routes = [
    {
        path: '/',
        name: 'Home',
        name: "home",
        component: HomeView,
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
    },
    {
        path: '/login',
        name: "login",
        component: LoginView,
    },
    {
        path: '/signup',
        name: "signup",
        component: SignupView,
    },
    {
        path: "/:catchAll(.*)", // Fallback ruta
        redirect: "/",
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;

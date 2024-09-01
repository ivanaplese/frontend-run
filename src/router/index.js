
import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/HomeView.vue';

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import store from "@/store";
import UserProfile from "@/views/UserProfile.vue";
import NewRace from "@/views/NewRace.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        name: "home",
        component: HomeView,
        meta: { needsUser: true },
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
        meta: { needsUser: true },
    },
    {
        path: '/login',
        name: "login",
        component: LoginView,
        meta: { guestOnly: true },
    },
    {
        path: '/signup',
        name: "signup",
        component: SignupView,
        meta: { guestOnly: true },
    },
    {
        path: "/profile",
        name: "user-profile",
        component: UserProfile,
        meta: { needsUser: true },
    },
    {
        path: "/newraces",
        name: "new-races",
        component: NewRace,
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/",
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {

    const isLoggedIn = store.currentUser !== null;

    if (isLoggedIn && to.meta.guestOnly) {
        next({ name: "home" });
    } else if (!isLoggedIn && to.meta.needsUser) {
        next({ name: "login" });
    } else {
        next();
    }
});



export default router;

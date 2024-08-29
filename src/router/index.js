
import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/HomeView.vue';

import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
// import SignupView from "../views/SignupView.vue"; 
import SignupView from "../views/SignupView.vue";
import store from "@/store";
import UserSettings from "@/views/SettingsView.vue";
import UserProfile from "@/views/UserProfile.vue";

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
        path: "/:catchAll(.*)",
        redirect: "/",
    },

    {
        path: "/settings",
        name: "user-settings",
        component: UserSettings,
        meta: { needsUser: true },
    },
    {
        path: "/profile",
        name: "user-profile",
        component: UserProfile,
        meta: { needsUser: true },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(
        "Bio sam na",
        from.name,
        "idem na",
        to.name,
        "a korisnik je",
        store.currentUser
    );

    const isLoggedIn = store.currentUser !== null;

    if (!isLoggedIn && to.meta.needsUser) {
        next({ name: "login" });
    } else if (isLoggedIn && to.meta.guestOnly) {
        next({ name: "home" });
    } else {
        next();
    }
});



export default router;

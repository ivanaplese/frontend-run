import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import SignupView from "../views/SignupView.vue";
import store from "@/store";
import UserProfile from "@/views/UserProfileView.vue";
import NewRace from "@/views/NewRaceView.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        name: "home",
        component: HomeView,
        meta: { needsUser: false },
    },
    {
        path: "/about",
        name: "about",
        component: AboutView,
        meta: { needsUser: false },
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
        meta: { needsUser: true, adminOnly: true }, // Samo admini mogu pristupiti
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
    const isAdmin = store.isAdmin;

    if (isLoggedIn && to.meta.guestOnly) {
        next({ name: "home" });
    } else if (!isLoggedIn && to.meta.needsUser) {
        next({ name: "login" });
    } else if (to.meta.adminOnly && !isAdmin) {
        next({ name: "home" }); // Preusmjeri usere koji nisu admini
    } else {
        next();
    }
});


export default router;

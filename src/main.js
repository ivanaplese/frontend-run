import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store"; // Uvezi store
import Croppa from "vue-croppa";
import { auth } from "./firebase";
import "vue-croppa/dist/vue-croppa.css";


const app = createApp(App);

// kad se user autentificira, azuriraj currentUser i isAdmin
auth.onAuthStateChanged((user) => {
    if (user) {
        store.currentUser = user;
        store.checkAdmin(); // Provjeri jel korisnik admin
    } else {
        store.currentUser = null;
        store.isAdmin = false;
    }
});

app.use(router).use(Croppa).mount("#app");
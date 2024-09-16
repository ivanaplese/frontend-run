import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Croppa from "vue-croppa";
import { auth } from "./firebase";
import "vue-croppa/dist/vue-croppa.css";


const app = createApp(App);

//firebase auth
auth.onAuthStateChanged((user) => {
    if (user) {
        store.currentUser = user;
        store.checkAdmin();
    } else {
        store.currentUser = null;
        store.isAdmin = false;
    }
});

app.use(router).use(Croppa).mount("#app");

//app.mount("#app"): Montira aplikaciju na HTML element s ID-jem #app, što znači da će se Vue aplikacija prikazati unutar tog elementa.
//u mainu se kreira vue aplikacija koristeci app.vue i dodaje se ruter store croppa
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";

const app = createApp(App);


app.use(router).use(Croppa).mount("#app");


import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Croppa from "vue-croppa";

createApp(App).use(router).mount("#app");
createApp.use(Croppa);
import { reactive } from "vue";

const state = reactive({
    token: localStorage.getItem("token") || null,
});
var currentUser = reactive({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
});
export default {
    searchTerm: "",
    isAdmin: false,
    currentUser,
    state,
    saveToken(token) {
        localStorage.setItem("token", token);
        state.token = token;
    },


    clearToken() {
        localStorage.removeItem("token");
        state.token = null;
    },
};

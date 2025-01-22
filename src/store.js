import { reactive } from "vue";
// Inicijalizacija state objekta kao reaktivnog
const state = reactive({
    token: localStorage.getItem("token") || null,
});
// Funkcija za pohranu tokena


export default {
    searchTerm: "",
    isAdmin: false,
    currentUser: {
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    },
    state, // Izvozimo state koji je sada reaktivan
    saveToken(token) {
        localStorage.setItem("token", token);
        state.token = token; // Ovdje se koristi reaktivni state
    },
    // Funkcija za brisanje tokena
    clearToken() {
        localStorage.removeItem("token");
        state.token = null; // Ovdje se također koristi reaktivni state
    },
    checkAdmin() {
        if (this.currentUser && this.currentUser.email === "plese@gmail.com") {
            this.isAdmin = true;
        } else {
            this.isAdmin = false;
        }
    },
};
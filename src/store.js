import { reactive } from "vue";
// Inicijalizacija state objekta kao reaktivnog
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

};
<template>
  <div id="app">
    <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand text-orange">run!</router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <div class="mx-auto">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/about" class="nav-link">About</router-link>
              </li>
              <li class="nav-item" v-if="isLogedIn">
                <router-link to="/favorites" class="nav-link"
                  >Favorites</router-link
                >
              </li>
            </ul>
          </div>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown" v-if="isLogedIn">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Pozdrav,
                {{ currentUser.username }}
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown"
              >
                <li>
                  <router-link to="/profile" class="dropdown-item"
                    >Profil</router-link
                  >
                </li>
                <li>
                  <router-link
                    to="/newraces"
                    class="dropdown-item"
                    v-if="isLogedIn"
                  >
                    Dodaj novu utrku</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button @click="logout" class="dropdown-item">Logout</button>
                </li>
              </ul>
            </li>
            <li class="nav-item" v-if="!isLogedIn">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="!isLogedIn">
              <router-link to="/signup" class="nav-link">Signup</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import store from "@/store";

export default {
  name: "App",
  data() {
    return {
      isAdmin: false,
    };
  },
  methods: {
    logout() {
      store.clearToken();
      console.log("Uspiješno ste odjavljeni");
      this.$router.push("/");
    },
  },
  

  computed: {
    isLogedIn() {
      console.log("Is loged in", store.currentUser);

      return store.state.token !== null;
    },
    currentUser() {
      console.log(store.currentUser);
      console.log("Trenutni korisnik", store.currentUser);
      return store.currentUser; // Reactive binding
    },

  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 10px;
  background-color: white !important;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: orange;
    }
  }

  .text-orange {
    color: orange !important;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>

<!-- app vue sluzi za glavnu navigaciju aplikacijom, i autentifikaciju putem firebasea
ima prilagdene rute ovisno u current user i glogbalno stanje store i integrirane rute -->

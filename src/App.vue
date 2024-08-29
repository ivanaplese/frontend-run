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
          aria-label="Toggle navigation">
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
            </ul>
          </div>
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown" v-if="currentUser">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="userDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                {{ currentUser }}
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="userDropdown">
                <li>
                  <router-link to="/settings" class="dropdown-item"
                    >Postavke</router-link
                  >
                </li>
                <li>
                  <router-link to="/profile" class="dropdown-item"
                    >Profil</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button @click="logout" class="dropdown-item">Logout</button>
                </li>
              </ul>
            </li>
            <li class="nav-item" v-if="!currentUser">
              <router-link to="/login" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="!currentUser">
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
import { auth } from "@/firebase.js";
import { onAuthStateChanged, signOut } from "firebase/auth";
import store from "@/store";
export default {
  name: "App",
  data() {
    return {
      currentUser: null,
    };
  },
  methods: {
    logout() {
      signOut(auth)
        .then(() => {
          console.log("Korisnik je uspješno odjavljen.");
          store.currentUser = null;
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error("Greška prilikom odjavljivanja:", error);
        });
    },
  },
  created() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        store.currentUser = user.email;
        this.currentUser = store.currentUser;
        console.log("*** User", user.email);
      } else {
        store.currentUser = null;
        this.currentUser = null;
        console.log("*** No user");
        // if (this.$route.name !== "login") {
          if (this.$route.meta.needsUser) {
          this.$router.push({ name: "login" });
        }
      }
    });
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
      color: #42b983;
    }
  }

  .text-orange {
    color: #f58634 !important;
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>

<template>
    <div class="favorites-container">
      <h2>Your Favorites</h2>
      <ul>
        <li v-for="race in favorites" :key="race.id">
          {{ race.name }} - {{ race.location }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { auth } from "@/firebase.js";
  import { onAuthStateChanged } from "firebase/auth";
  import { db, collection, getDocs } from "@/firebase.js";
  
  export default {
    data() {
      return {
        email: "",
        favorites: [],
      };
    },
    created() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.email = user.email;
          this.fetchFavorites();
        }
      });
    },
    methods: {
      async fetchFavorites() {
        try {
          const favoritesCollection = collection(
            db,
            "users",
            this.email,
            "favorites"
          );
          const querySnapshot = await getDocs(favoritesCollection);
          this.favorites = [];
          querySnapshot.forEach((doc) => {
            this.favorites.push(doc.data());
          });
        } catch (error) {
          console.error("Error fetching favorites:", error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .favorites-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Ovdje koristimo 100% visine zaslona */
    text-align: center;
  }
  
  ul {
    list-style: none; /* Uklanja oznake liste */
    padding: 0;
  }
  
  li {
    margin: 10px 0;
    font-size: 18px;
  }
  </style>
  
<template>
  <div class="favorites-container">
    <h2>Your Favorites</h2>
    <ul>
      <li v-for="race in favorites" :key="race.id">
        {{ race.naziv }} - {{ race.lokacija }}
      </li>
      <!-- v for za iteriranje, key jedinstveni identifikator za azuriranje promjena -->
    </ul>
  </div>
</template>

<script>
import { auth } from "@/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { db, collection, getDocs } from "@/firebase.js";
import store from "@/store.js";
import api from "@/connection.js";
export default {
  data() {
    return {
      email: "",
      favorites: [],
    };
  },

  methods: {
    async fetchFavorites() {
      try {
        const racesIds = await api.get(
          `/favorit/user/${store.currentUser._id}`
        );
        console.log("Podaci iz curent usera", racesIds.data);
        this.favorites = [];
        for (const race of racesIds.data) {
          try {
            console.log("Race id", race.raceId);
            const raceDetails = await api.get(`/race/${race.raceId}`);
            console.log("Podaci iz foreach", raceDetails.data);
            this.favorites.push(raceDetails.data);
          } catch (error) {
            console.error("Error tijekom dohvačanja:", error);
          }
        }
        console.log("Ovo su favoriti", this.favorites);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    },
  },
  async mounted() {
    await this.fetchFavorites();
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
<template>
  <div class="favorites-container">
    <h2 class="mb-4">Your Favorites</h2>
    <div class="favorites-grid">
      <div v-for="race in favorites" :key="race.id" class="card">
        <div class="card-body">
          <img :src="race.image" class="card-img-top" alt="Race image" />
          <h5 class="card-title">
            <a href="#" @click.prevent="showDetails(race)">
              {{ race.naziv }}
            </a>
          </h5>
          <p class="card-text">{{ race.tip }} - {{ race.lokacija }}</p>
          <p class="card-text">
            <small class="text-muted">{{ race.datum }}</small>
          </p>
          <button
            class="btn btn-danger btn-sm"
            @click="removeFromFavorites(race)"
          >
            Remove from Favorites
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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

            
            raceDetails.data.image = raceDetails.data.imageId
  ? `${process.env.VUE_APP_API_URL}/race/slika/${race.imageId}/image`
  : "default-image.jpg";


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
    async removeFromFavorites(race) {
      try {
        let alreadyExists = false;

        console.log("Gumb je pretisnut");
        const favorites = await api.get("/favorit");
        console.log("Favorites data", favorites.data);
        console.log("race id", race._id);
        console.log("user id:", store.currentUser._id);
        favorites.data.forEach((favorite) => {
          if (
            favorite.raceId === race._id &&
            favorite.userId === store.currentUser._id
          ) {
            alreadyExists = true;
            console.log(favorite);
            console.log("race id", race.id);
            console.log("user id:", store.currentUser._id);
            api.delete(`/favorit/${favorite._id}`);
          }
        });
      } catch (error) {
        console.error("Greška prilikom dodavanja u favorite:", error);
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
  text-align: center;
  padding: 20px;
}

.favorites-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px; 
  justify-content: center; 
}

.card {
  width: 300px; 
  height: 100%; 
  display: flex;
  flex-direction: column; 
}

.card-img-top {
  height: 180px;
  object-fit: cover;
}

.card-title a {
  color: rgb(255, 132, 0) !important;
  text-decoration: none;
  font-weight: bold;
}

.card-title a:hover {
  color: black !important;
}
</style>

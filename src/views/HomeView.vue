
<template>
  <div class="container">

     <!-- Marathons -->

    <div v-if="marathons.length" class="row mb-4">
      <h4 class="mb-3">Marathons</h4>
      <div
        v-for="marathon in marathons.slice(0, 6)"
        :key="marathon.id"
        class="col-md-4">
        <div class="card">
          <img :src="marathon.image" class="card-img-top" alt="Race image" />
          <div class="card-body">
            <h5 class="card-title">
              <a href="#" @click.prevent="showDetails(marathon)">{{
                marathon.name
              }}</a>
            </h5>
            <p class="card-text">
              {{ marathon.type }} - {{ marathon.location }}
            </p>
            <p class="card-text">
              <small class="text-muted">{{ marathon.date }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>

        <!-- Half Marathons -->

    <div v-if="halfMarathons.length" class="row mb-4">
      <h4 class="mb-3">Half Marathons</h4>
      <div
        v-for="halfMarathon in halfMarathons.slice(0, 6)"
        :key="halfMarathon.id"
        class="col-md-4">
        <div class="card">
          <img
            :src="halfMarathon.image"
            class="card-img-top"
            alt="Race image" />
          <div class="card-body">
            <h5 class="card-title">
              <a href="#" @click.prevent="showDetails(halfMarathon)">{{
                halfMarathon.name
              }}</a>
            </h5>
            <p class="card-text">
              {{ halfMarathon.type }} - {{ halfMarathon.location }}
            </p>
            <p class="card-text">
              <small class="text-muted">{{ halfMarathon.date }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>

       <!-- Trails -->

    <div v-if="trails.length" class="row mb-4">
      <h4 class="mb-3">Trails</h4>
      <div v-for="trail in trails.slice(0, 6)" :key="trail.id" class="col-md-4">
        <div class="card">
          <img :src="trail.image" class="card-img-top" alt="Race image" />
          <div class="card-body">
            <h5 class="card-title">
              <a href="#" @click.prevent="showDetails(trail)">{{
                trail.name
              }}</a>
            </h5>
            <p class="card-text">{{ trail.type }} - {{ trail.location }}</p>
            <p class="card-text">
              <small class="text-muted">{{ trail.date }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>

       <!-- No Races Message -->

    <div
      v-else-if="!marathons.length && !halfMarathons.length && !trails.length">
      <p class="text-center mt-5">Trenutno nema utrka.</p>
    </div>

        <!-- Race Details Modal -->

    <div
      v-if="selectedRace"
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block"
      @click.self="selectedRace = null">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedRace.name }}</h5>
            <button type="button" class="close" @click="selectedRace = null">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p><strong>Type:</strong> {{ selectedRace.type }}</p>
            <p><strong>Location:</strong> {{ selectedRace.location }}</p>
            <p><strong>Date:</strong> {{ selectedRace.date }}</p>
            <p>{{ selectedRace.description }}</p>
          </div>
          <div class="modal-footer">
            <button
            v-if="isUserLoggedIn && isRaceInFavorites(selectedRace.id)"
              class="btn btn-success"
              disabled>
              Dodano u favorite
            </button>
            <button
v-if="isUserLoggedIn && !isRaceInFavorites(selectedRace.id)"
              class="btn btn-primary"
              @click="addToFavorites(selectedRace)">
              Dodaj u favorite
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="selectedRace = null">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, collection, getDocs, addDoc, auth } from "@/firebase.js";
import store from "@/store";

export default {
  name: "HomeView",
  data() {
    return {
     races: [],
    selectedRace: null,
    currentUser: store.currentUser,
    favorites: [],
    isUserLoggedIn: false,
    };
  },
  computed: {
    marathons() {
      return this.races.filter((race) => race.type === "Marathon");
    },
    halfMarathons() {
      return this.races.filter((race) => race.type === "Half Marathon");
    },
    trails() {
      return this.races.filter((race) => race.type === "Trail");
    },
  },

  mounted() {
    console.log("MOUNTED.");
    this.getPosts();
    this.fetchFavorites();
  },

  mounted() {
    this.getPosts();
    this.fetchFavorites();
    this.checkUserStatus();
  },


  methods: {
    showDetails(race) {
      this.selectedRace = race;
    },

    getPosts() {

      const racesCollection = collection(db, "races");
      getDocs(racesCollection)
        .then((querySnapshot) => {
          this.races = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            this.races.push({
              id: doc.id,
              name: data.name,
              date: data.date,
              location: data.location,
              description: data.description,
              type: data.type,
              image: data.image || require("@/assets/run.jpeg"),
            });
          });
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    },

    fetchFavorites() {
      const user = auth.currentUser;
      if (!user) return;
      const favoritesCollection = collection(db, "favorites");
      getDocs(favoritesCollection)
        .then((querySnapshot) => {
          this.favorites = querySnapshot.docs
            .filter((doc) => doc.data().userId === user.uid)
            .map((doc) => doc.data().raceId);
        })
        .catch((error) => {
          console.error("Greška prilikom dohvaćanja favorita:", error);
        });
    },
    checkUserStatus() {
      this.isUserLoggedIn = !!auth.currentUser;
    },

    addToFavorites(race) {
      const user = auth.currentUser;
      if (!user) return;
      // Ovdje radimo provjeru dali je već u favoritima
      if (this.favorites && this.favorites.includes(race.id)) {
        return; // Ne vraćaj ništa ako je već u favoritima
      }

      const favoritesCollection = collection(db, "favorites");
      addDoc(favoritesCollection, {
        userId: user.uid,
        raceId: race.id,
      })
        .then(() => {
          if (!this.favorites) {
            this.favorites = [];
          }
          this.favorites.push(race.id);
        })
        .catch((error) => {
          console.error("Greška prilikom dodavanja u favorite:", error);
        });
    },
    isRaceInFavorites(raceId) {
      if (!this.favorites) {
        return false;
      }
      return this.favorites.includes(raceId);
    },
  },
};




</script>
<style scoped>
.card {
  height: 100%;
}
.card-img-top {
  height: 180px;
  object-fit: cover;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
}

</style>
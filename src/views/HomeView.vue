
<template>
  <div class="container">
 
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

    <div
      v-else-if="!marathons.length && !halfMarathons.length && !trails.length">
      <p class="text-center mt-5">Trenutno nema utrka.</p>
    </div>

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
import { db, collection, getDocs } from "@/firebase.js";


export default {
  name: "HomeView",
  data() {
    return {
     races: [],
    selectedRace: null,
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
  },

  methods: {
    showDetails(race) {
      this.selectedRace = race;
    },

    getPosts() {
      console.log("Firebase dohvat...");
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
            });
          });
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
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
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.text-center {
  font-size: 1.5rem;
  font-weight: bold;
}
.mt-5 {
  margin-top: 3rem;
}
h4 {
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 20px;
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
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
}
.modal-body {
  font-size: 1rem;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
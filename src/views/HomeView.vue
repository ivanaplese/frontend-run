
<template>
  <div class="container">
    <form @submit.prevent="postNewRace" class="form-inline mb-5">
      <div class="form-group">
        <label for="name">Race Name:</label>
        <input type="text" id="name" v-model="newRaceName" required />
      </div>
      <div>
        <label for="type">Race Type:</label>
        <input type="text" id="type" v-model="newRaceType" required />
      </div>
      <div>
        <label for="date">Date:</label>
        <input type="date" id="date" v-model="newRaceDate" required />
      </div>
      <div>
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="newRaceLocation" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea id="description" v-model="newRaceDescription"></textarea>
      </div>
      <button type="submit">Add New Race</button>
    </form>
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
import runImage from "@/assets/run.jpeg";
import { db, collection, addDoc } from "@/firebase.js";
import store from "@/store";

export default {
  name: "HomeView",
  data() {
    return {
      newRaceName: "",
      newRaceType: "",
      newRaceDate: "",
      newRaceLocation: "",
      newRaceDescription: "",
      races: [
        {
          id: 1,
          name: "Zagreb Marathon",
          type: "Marathon",
          location: "Zagreb",
          date: "2024-09-15",
          image: runImage,
          description:
            "The Zagreb Marathon is one of the most popular marathons in Croatia, taking you through the heart of the city.",
        },
        {
          id: 2,
          name: "Dubrovnik Half Marathon",
          type: "Half Marathon",
          location: "Dubrovnik",
          date: "2024-10-10",
          image: runImage,
          description:
            "Dubrovnik Half Marathon offers a scenic route along the historic city walls and the Adriatic coast.",
        },
        {
          id: 3,
          name: "Istria Trail",
          type: "Trail",
          location: "Istria",
          date: "2024-11-20",
          image: runImage,
          description:
            "The Istria Trail offers rugged terrain and beautiful landscapes, perfect for trail running enthusiasts.",
        },
        {
          id: 4,
          name: "Dalmatia Trail",
          type: "Trail",
          location: "Dalmatia",
          date: "2024-10-20",
          image: runImage,
          description:
            "Dalmatia Trail takes you through the mountainous regions of Dalmatia, offering breathtaking views.",
        },
        {
          id: 5,
          name: "Slavonia Trail",
          type: "Trail",
          location: "Slavonia",
          date: "2024-05-20",
          image: runImage,
          description:
            "Slavonia Trail offers a unique opportunity to explore the beautiful plains of Eastern Croatia.",
        },
        {
          id: 6,
          name: "CCC Trail",
          type: "Trail",
          location: "Alpe",
          date: "2024-04-20",
          image: runImage,
          description:
            "The CCC Trail is part of the UTMB series, challenging runners with its tough alpine terrain.",
        },
      ],
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
  methods: {
    showDetails(race) {
      this.selectedRace = race;
    },
    postNewRace() {
      const newRace = {
        name: this.newRaceName,
        type: this.newRaceType,
        date: this.newRaceDate,
        location: this.newRaceLocation,
        description: this.newRaceDescription,
        email: store.currentUser.email,
      };
      db.collection("races")
        .add(newRace)
        .then(() => {
          console.log("Race successfully added!");
          this.newRaceName = "";
          this.newRaceType = "";
          this.newRaceDate = "";
          this.newRaceLocation = "";
          this.newRaceDescription = "";
        })
        .catch((error) => {
          console.error("Error adding race: ", error);
        });
    },
    async postNewRace() {
      try {
        // Prvo da dobijem tu kolekciju
        const racesCollection = collection(db, "races");
        // Dodavanje nove utrke
        const docRef = await addDoc(racesCollection, {
          name: this.newRaceName,
          date: this.newRaceDate,
          location: this.newRaceLocation,
          type: this.newRaceType,
          description: this.newRaceDescription,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
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
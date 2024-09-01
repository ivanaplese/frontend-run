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
    </div>
  </template>
  
  <script>
  import runImage from "@/assets/run.jpeg";
  import { db, collection, addDoc, getDocs } from "@/firebase.js";
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
      // provjera dali mounted stvarno radi
      console.log("MOUNTED.");
      this.getPosts();
      // dohvat iz firebasea
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
                id: data.id,
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
      postNewRace() {
        const racesCollection = collection(db, "races");
        addDoc(racesCollection, {
          name: this.newRaceName,
          date: this.newRaceDate,
          location: this.newRaceLocation,
          type: this.newRaceType,
          description: this.newRaceDescription,
        })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            this.newRaceName = "";
            this.newRaceType = "";
            this.newRaceDate = "";
            this.newRaceLocation = "";
            this.newRaceDescription = "";
            // Ponovno dohvaćanje svih utrka nakon dodavanja nove
            this.getPosts();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
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
<template>
    <div class="container">
      <h1>Add New Race</h1>
      <form @submit.prevent="postNewRace" class="form-inline mb-5">
        <div class="form-group">
          <label for="name">Race Name:</label>
          <input type="text" id="name" v-model="newRaceName" required />
        </div>


        <div>
          <label for="type">Race Type:</label>
          <select id="type" v-model="newRaceType" required>
          <option value="Marathon">Marathon</option>
          <option value="Half Marathon">Half Marathon</option>
          <option value="Trail">Trail</option>
        </select>
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

        
      <div>
        <label for="image">Race Image:</label>
        <input type="file" id="image" @change="onImageSelected" />
      </div>


        <button type="submit">Add New Race</button>
      </form>
    </div>
  </template>
  
  <script>
  import { db, collection, addDoc } from "@/firebase.js";
import runImage from "@/assets/run.jpeg";

  export default {
  name: "NewRace",
    data() {
      return {
        newRaceName: "",
        newRaceType: "",
        newRaceDate: "",
        newRaceLocation: "",
        newRaceDescription: "",
        newRaceImage: null,
      };
    },

    methods: {
  
      onImageSelected(event) {
      this.newRaceImage = event.target.files[0];
    },
    async postNewRace() {
      const raceData = {
          name: this.newRaceName,
          type: this.newRaceType,
          date: this.newRaceDate,
          location: this.newRaceLocation,
          description: this.newRaceDescription,
        };
      if (!this.newRaceImage) {
        raceData.image = runImage;
      } else {
        raceData.image = URL.createObjectURL(this.newRaceImage);
      }
      try {
        const docRef = await addDoc(collection(db, "races"), raceData);
        console.log("Document written with ID: ", docRef.id);
        this.resetForm();
        alert("Utrka je uspješno dodana.");
        this.$router.push({ name: "home" });
      } catch (error) {
        console.error("Error adding document: ", error);
        alert("Greška:", error);
      }
    },
    resetForm() {
      this.newRaceName = "";
      this.newRaceType = "";
      this.newRaceDate = "";
      this.newRaceLocation = "";
      this.newRaceDescription = "";
      this.newRaceImage = null;
      document.getElementById("image").value = "";
    },
  },
};

  
  </script>
  
  <style scoped>
  
  .form-inline {
  display: flex;
  flex-direction: column;
  }

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
    font-weight: bold;

  }
  input[type="text"],
input[type="date"],
textarea,
select {
  padding: 8px;
  box-sizing: border-box;
}

input[type="file"] {
  margin-top: 10px;
}


button {
  align-self: flex-start;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  }
  </style>
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
        <label for="imageUrl">Race Image URL:</label>
        <input
          type="file"
          id="imageFile"
          @change="handleFileUpload"
          accept="image/*"
        />
      </div>

      <button type="submit">Add New Race</button>
    </form>
  </div>
</template>

<script>
import defaultImage from "@/assets/run.jpeg";
import api from "@/connection";
import store from "@/store";

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
    handleFileUpload(event) {
      this.newRaceImage = event.target.files[0];
    },
    async postNewRace() {
      if (!this.newRaceImage) {
        alert("Please upload an image.");
        return;
      }

      
      const formData = new FormData();
      formData.append("naziv", this.newRaceName);
      formData.append("vrsta", this.newRaceType);
      formData.append("datum", this.newRaceDate);
      formData.append("location", this.newRaceLocation);
      formData.append("opis", this.newRaceDescription);
      formData.append("creatorId", store.currentUser._id);
      formData.append("image", this.newRaceImage); 

      try {
        const response = await api.post("/race", formData, {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        });

        console.log("Race added successfully:", response.data);
        alert("Race added successfully!");
        this.clearForm();
      } catch (error) {
        console.error("Error adding race:", error);
        alert("There was an error adding the race.");
      }
    },
    clearForm() {
      this.newRaceName = "";
      this.newRaceType = "";
      this.newRaceDate = "";
      this.newRaceLocation = "";
      this.newRaceDescription = "";
      this.newRaceImage = "";
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

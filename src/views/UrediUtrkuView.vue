<template>
  <v-app>
    <v-container>
      <h2 class="mb-4 pb-2 pb-md-0 mb-md-2 text-center">Uredi utrku</h2>


      <v-form @submit.prevent="UrediPodatke">
        <v-row>
          <v-col sm="6">
            <input type="text" v-model="race.naziv" placeholder="Naziv utrke" />

            <input type="text" v-model="race.lokacija" placeholder="Lokacija" />

            <input type="date" v-model="race.datum" placeholder="Datum utrke" />

            <select v-model="race.type">
              <option disabled value="">Odaberi vrstu utrke</option>
              <option>Marathon</option>
              <option>Half Marathon</option>
              <option>Trail</option>
            </select>



            <input
              type="text"
              v-model="race.description"
              placeholder="Opis utrke"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="2">
            <v-btn
              @click="UrediPodatke"
              class="d-flex justify-center align-center"
            >
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-app>
</template>

<script>

import api from "@/connection.js";
import store from "@/store.js";
export default {
  data() {
    return {
      race: {
        naziv: "",
        datum: "",
        location: "",
        opis: "",
        vrsta: "",
      },
    };
  },
  mounted() {
    const raceId = this.$route.params.id; 
    this.fetchRace(raceId); 
  },
  methods: {
    async fetchRace(id) {
      try {
        const raceDoc = await api.get(`/race/${id}`);
        console.log(raceDoc.data);

        this.race = raceDoc.data;
        this.race.id = id;
        console.log("This.race", this.race);
      } catch (error) {
        console.error("Error getting document:", error);
      }
    },


    async UrediPodatke() {
      try {
        const result = await api.put("/race", {
          _id: this.race.id,
          naziv: this.race.naziv,
          lokacija: this.race.lokacija,
          datum: this.race.datum,
          opis: this.race.opis,
          vrsta: this.race.type,
        });
        alert("Utrka je uspješno uređena.");

        this.$router.push("/races");
      } catch (error) {
        console.error("Greška prilikom ažuriranja utrke:", error);
      }
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #333;
  font-weight: bold;
  margin-bottom: 20px;
}

input,
select {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

input[type="text"],
input[type="date"],
textarea {
  background-color: #fff;
}

input[type="text"]:focus,
input[type="date"]:focus,
textarea:focus {
  border-color: #f58634;
  outline: none;
}

v-btn {
  background-color: #f58634;
  color: #fff;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

v-btn:hover {
  background-color: #d97329;
}

.v-form {
  margin-top: 20px;
}

.v-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.v-col {
  flex: 1;
  padding: 10px;
  min-width: 200px;
}

@media (max-width: 768px) {
  .v-col {
    width: 100%;
    padding: 5px;
  }
}
</style>

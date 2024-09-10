<template>
    <v-app>
      <v-container>
        <h2 class="mb-4 pb-2 pb-md-0 mb-md-2 text-center">Uredi utrku</h2>

      <!-- Forma prikazana samo ako su podaci učitani -->
      <v-form v-if="race.name" @submit.prevent="UrediPodatke">
        <v-row>
            <v-col sm="6">
              <input type="text" v-model="race.name" placeholder="Naziv utrke" />
  
              <input type="text" v-model="race.location" placeholder="Lokacija" />

              <input type="date" v-model="race.date" placeholder="Datum utrke" />
              
            <select v-model="race.type">
              <option disabled value="">Odaberi vrstu utrke</option>
              <option>Marathon</option>
              <option>Half Marathon</option>
              <option>Trail</option>
            </select>

            
            <input
              type="text"
              v-model="race.description"
              placeholder="Opis utrke" />
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="2">
              <v-btn
                @click="UrediPodatke"
                class="d-flex justify-center align-center">
              Submit
            </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-app>
  </template>
  
  <script>
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Uvezi Firestore bazu

  export default {
    data() {
      return {
        race: {
        name: "",
        date: "",
        location: "",
        description: "",
        type: "",
      },
      };
    },
    mounted() {
      const raceId = this.$route.params.id; // Dohvati ID iz rute
      this.fetchRace(raceId); // Učitaj podatke utrke
    },
    methods: {
          // Metoda za dohvaćanje podataka utrke
      async fetchRace(id) {
        try {
          const raceDoc = await getDoc(doc(db, "races", id)); // Dohvati dokument utrke
        if (raceDoc.exists()) {
          this.race = raceDoc.data(); // Postavi podatke utrke
          this.race.id = id; // Dodaj ID u race objekt
        } else {
          console.log("No such document!");
        }
        } catch (error) {
          console.error("Error getting document:", error);
        }
      },
    // Metoda za uređivanje podataka utrke
    async UrediPodatke() {

        try {
        // Ažuriraj podatke o utrci u Firestoreu
        // Ažuriranje dokumenta s novim podacima
        await updateDoc(doc(db, "races", this.race.id), {
          name: this.race.name,
          location: this.race.location,
          date: this.race.date,
          description: this.race.description,
          type: this.race.type,
        });
            // Obavijest korisniku
            alert("Utrka je uspješno uređena.");

        // Preusmjeri korisnika na home
        // Nakon uspješnog ažuriranja, možeš preusmjeriti korisnika
        this.$router.push("/races"); // Primjer preusmjeravanja na listu utrka
      } catch (error) {
        console.error("Greška prilikom ažuriranja utrke:", error);
      }
      
      },
    },
  };
  </script>
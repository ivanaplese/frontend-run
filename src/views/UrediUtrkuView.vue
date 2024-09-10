<template>
    <v-app>
      <v-container>
        <h2 class="mb-4 pb-2 pb-md-0 mb-md-2 text-center">Uredi utrku</h2>
        <v-form v-if="race.name">
          <!-- Prikaži formu samo ako su podaci učitani -->
          <v-row>
           
            <v-col sm="6">
              <input type="text" v-model="race.name" placeholder="Naziv utrke" />
  
              <input type="text" v-model="race.location" placeholder="Lokacija" />

              <input type="date" v-model="race.date" placeholder="Datum utrke" />
  
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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/firebase"; // Uvezi Firestore bazu

  export default {
    data() {
      return {
        race: {
        name: "",
        date: "",
        location: "",
        description: "",
      },
      };
    },
    mounted() {
      const raceId = this.$route.params.id; // Dohvati ID utrke iz rute
      this.fetchRace(raceId); // Pozovi metodu za dohvaćanje podataka utrke
    },
    methods: {
      async fetchRace(id) {
        try {
          const raceDoc = await getDoc(doc(db, "races", id)); // Dohvati dokument utrke
        if (raceDoc.exists()) {
          this.race = raceDoc.data(); // Postavi podatke utrke
        } else {
          console.log("No such document!");
        }
        } catch (error) {
          console.error("Error getting document:", error);
        }
      },
      async UrediPodatke() {
        const idUtrke = this.$route.params.id;

        try {
        // Ažuriraj podatke o utrci u Firestoreu
        await setDoc(doc(db, "races", idUtrke), {
          name: this.race.name,
          location: this.race.location,
          date: this.race.date,
          description: this.race.description,
        });
        console.log("Utrka uspješno ažurirana!");

        // Preusmjeri korisnika na home
        this.$router.push("/");
      } catch (error) {
        console.error("Greška prilikom ažuriranja podataka:", error);
      }
      
      },
    },
  };
  </script>
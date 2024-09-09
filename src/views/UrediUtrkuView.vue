<template>
    <v-app>
      <v-container>
        <h2 class="mb-4 pb-2 pb-md-0 mb-md-2 text-center">Uredi utrku</h2>
        <v-form v-if="name">
          <!-- Prikaži formu samo ako su podaci učitani -->
          <v-row>
            <v-col cols="12" sm="6">
              <v-img
                :src="image || defaultImage"
                alt="Trenutna slika utrke"
                height="350px"
                width="350px" />
              <p class="text-muted">Slika se ne može mijenjati</p>
            </v-col>
            <v-col sm="6">
              <v-text-field
                outlined
                v-model="name"
                label="Naziv utrke"></v-text-field>
  
              <v-text-field
                outlined
                v-model="location"
                label="Lokacija"></v-text-field>
  
              <v-text-field
                outlined
                v-model="date"
                label="Datum utrke"></v-text-field>
  
              <v-textarea
                counter
                outlined
                v-model="description"
                label="Opis utrke"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col sm="2">
              <v-btn
                @click="UrediPodatke"
                class="d-flex justify-center align-center"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { collection, getDocs, doc, setDoc } from "firebase/firestore";
  import { db } from "@/firebase";
  export default {
    data() {
      return {
        name: "",
        location: "",
        date: "",
        description: "",
        image: "",
        defaultImage: require("@/assets/run.jpeg"),
      };
    },
    mounted() {
      this.dovatiUtrku();
    },
    methods: {
      async dovatiUtrku() {
        const idUtrke = this.$route.params.id;
        try {
          const querySnapshot = await getDocs(collection(db, "races"));
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            if (doc.id == idUtrke) {
              this.name = data.name;
              this.location = data.location;
              this.date = data.date;
              this.description = data.description;
              this.image = data.image || this.defaultImage;
            }
          });
        } catch (error) {
          console.error("Greška prilikom dohvaćanja podataka o utrci:", error);
        }
      },
      async UrediPodatke() {
        const idUtrke = this.$route.params.id;
        await setDoc(doc(db, "races", idUtrke), {
          name: this.name,
          location: this.location,
          date: this.date,
          description: this.description,
          image: this.image, // Ovdje će se prikazati default slika
        });
        this.$router.replace("/prikaz-utrke/" + idUtrke);
      },
    },
  };
  </script>
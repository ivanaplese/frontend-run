<template>
  <div class="container">
    <!-- Search Form -->
    <div class="row mb-4">
      <div class="col-md-12">
        <form @submit.prevent="performSearch">
          <div class="input-group">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control"
              placeholder="Search by name, type, or location"
            />
          </div>
        </form>
      </div>
    </div>

    <!-- Marathons -->
    <div v-if="filteredMarathons.length" class="row mb-4">
      <h4 class="mb-3">Marathons</h4>
      <div
        v-for="marathon in filteredMarathons.slice(0, 6)"
        :key="marathon.id"
        class="col-md-4"
      >
        <!--  key se koristi za identifikaciju svakog elementa u petlji v for -->
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
    <div v-if="filteredHalfMarathons.length" class="row mb-4">
      <h4 class="mb-3">Half Marathons</h4>
      <div
        v-for="halfMarathon in filteredHalfMarathons.slice(0, 6)"
        :key="halfMarathon.id"
        class="col-md-4"
      >
        <div class="card">
          <img
            :src="halfMarathon.image"
            class="card-img-top"
            alt="Race image"
          />
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
    <div v-if="filteredTrails.length" class="row mb-4">
      <h4 class="mb-3">Trails</h4>
      <div
        v-for="trail in filteredTrails.slice(0, 6)"
        :key="trail.id"
        class="col-md-4"
      >
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
      v-else-if="
        !filteredMarathons.length &&
        !filteredHalfMarathons.length &&
        !filteredTrails.length
      "
    >
      <p class="text-center mt-5">Trenutno nema utrka.</p>
    </div>

    <!-- Race Details Modal -->
    <div
      v-if="selectedRace"
      class="modal"
      tabindex="-1"
      role="dialog"
      style="display: block"
      @click.self="selectedRace = null"
    >
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
              @click="selectedRace = null"
            >
              Close
            </button>
            <button
              v-if="currentUser"
              type="button"
              class="btn btn-primary"
              @click="
                addedToFavorites
                  ? handleRemoveFromFavorites()
                  : handleAddToFavorites()
              "
            >
              {{ addedToFavorites ? "Ukloni iz favorita" : "Dodaj u favorite" }}
            </button>

            <button
              v-if="isAdmin"
              type="button"
              class="btn btn-warning"
              @click="IdiNaUredivanje(selectedRace)"
            >
              Uredi utrku
            </button>

            <button
              v-if="isAdmin"
              type="button"
              class="btn btn-danger"
              @click="IzbrisiUtrku(selectedRace)"
            >
              Izbriši utrku
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db, collection, getDocs, addDoc, deleteDoc, doc } from "@/firebase.js";
import store from "@/store";
import api from "@/connection";
export default {
  name: "HomeView",
  data() {
    return {
      races: [],
      searchQuery: "",
      selectedRace: null,
      currentUser: store.currentUser,
      addedToFavorites: false,
    };
  },
  //racunate vrijednosti, computed sluzi za pisanje funkcija koje su za obradu ili filtriranje podataka
  computed: {
    marathons() {
      return (this.races || []).filter((race) => race.type === "Marathon");
    },
    halfMarathons() {
      return (this.races || []).filter((race) => race.type === "Half Marathon");
    },
    trails() {
      return (this.races || []).filter((race) => race.type === "Trail");
    },
    filteredMarathons() {
      return this.marathons.filter((race) => this.matchesSearch(race));
    },
    filteredHalfMarathons() {
      return this.halfMarathons.filter((race) => this.matchesSearch(race));
    },
    filteredTrails() {
      return this.trails.filter((race) => this.matchesSearch(race));
    },
  },
  //lifecycle hook, određuje kad točno će se nešto prikazati iz firestore na ekranu
  mounted() {
    this.currentUser = store.currentUser;
    this.getPosts();
  },
  //u metode idu sve funkcije koje bi mogli htjeti pozivati u indxu
  methods: {
    showDetails(race) {
      this.selectedRace = race;
      this.checkIfFavorite(this.race);
    },
    async getPosts() {
      try {
        const response = await api.get("/race");
        console.log(response);

        // Mapiramo podatke iz API-ja u format koji koristi Vue aplikacija
        this.races = response.data.map((race) => ({
          id: race.id || race._id, // Koristimo `id` ili `_id` kao identifikator
          name: race.naziv, // Mijenjamo `naziv` u `name`
          type: race.vrsta, // Mijenjamo `vrsta` u `type`
          location: race.lokacija || "Nepoznata lokacija", // Ako `lokacija` nedostaje
          date: race.datum || "Nepoznat datum", // Ako `datum` nedostaje
          description: race.opis || "Nema opisa", // Ako `opis` nedostaje
          image: race.slika || "default-image.jpg", // Ako nema slike
        }));

        console.log("Ovo su dohvaćene utrke:", this.races);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja utrka: ", error);
      }
    },
    handleAddToFavorites() {
      if (this.currentUser && this.selectedRace) {
        this.addToFavorites(this.selectedRace);
      } else {
        alert("Morate biti prijavljeni da biste dodali utrke u favorite.");
      }
    },

    async addToFavorites(race) {
      try {
        const favoritesCollection = collection(
          db,
          "users",
          this.currentUser,
          "favorites"
        );
        const querySnapshot = await getDocs(favoritesCollection);
        let alreadyExists = false;
        querySnapshot.forEach((doc) => {
          if (doc.data().id === race.id) {
            alreadyExists = true;
          }
        });
        if (!alreadyExists) {
          await addDoc(favoritesCollection, race);
          this.addedToFavorites = true;
          alert("Utrka je dodana u favorite!");
        } else {
          alert("Ova utrka je već u favoritima.");
          throw new Error("Race already in favorites");
        }
      } catch (error) {
        console.error("Greška prilikom dodavanja u favorite:", error);
      }
    },

    handleRemoveFromFavorites() {
      if (this.currentUser && this.selectedRace) {
        this.removeFromFavorites(this.selectedRace);
      } else {
        alert("Morate biti prijavljeni da biste uklonili utrke iz favorita.");
      }
    },

    async removeFromFavorites(race) {
      try {
        const favoritesCollection = collection(
          db,
          "users",
          this.currentUser,
          "favorites"
        );
        const querySnapshot = await getDocs(favoritesCollection);
        querySnapshot.forEach(async (doc) => {
          if (doc.data().id === race.id) {
            try {
              await deleteDoc(doc.ref);
              this.addedToFavorites = false;
              alert("Utrka je uklonjena iz favorita.");
            } catch (error) {
              console.error("Greška prilikom uklanjanja iz favorita:", error);
            }
          }
        });
      } catch (error) {
        console.error("Greška prilikom dohvaćanja favorita:", error);
      }
    },

    async checkIfFavorite(race) {
      if (!this.currentUser) {
        this.addedToFavorites = false;
        return;
      }

      try {
        const favoritesCollection = collection(
          db,
          "users",
          this.currentUser,
          "favorites"
        );
        const querySnapshot = await getDocs(favoritesCollection);
        this.addedToFavorites = false;
        querySnapshot.forEach((doc) => {
          if (doc.data().id === race.id) {
            this.addedToFavorites = true;
          }
        });
      } catch (error) {
        console.error("Greška prilikom provjere favorita:", error);
      }
    },

    matchesSearch(race) {
      const query = this.searchQuery.toLowerCase();
      return (
        race.name.toLowerCase().includes(query) ||
        race.type.toLowerCase().includes(query) ||
        race.location.toLowerCase().includes(query)
      );
    },

    IdiNaUredivanje(race) {
      this.$router.push(`/uredi-utrku/${race.id}`);
    },

    async IzbrisiUtrku(race) {
      try {
        await deleteDoc(doc(db, "races", race.id));
        this.selectedRace = null;
        alert("Utrka je uspješno izbrisana.");
        this.getPosts();
      } catch (error) {
        console.error("Greška prilikom brisanja utrke:", error);
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
.input-group {
  max-width: 600px;
  margin: auto;
}
.card-title a {
  color: rgb(255, 132, 0) !important;
  text-decoration: none;
  font-weight: bold;
}
.card-title a:hover {
  color: black !important;
}
</style>
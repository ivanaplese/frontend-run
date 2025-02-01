<template>
  <div class="user-profile">
    <h2>User Profile</h2>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        class="form-control"
        readonly
      />
    </div>

    <div class="form-group">
      <label for="displayName">UserName</label>
      <input
        type="text"
        id="displayName"
        v-model="displayName"
        class="form-control"
      />
    </div>

    <button @click="updateProfile" class="btn btn-primary">
      Update Profile
    </button>

    <div class="form-group">
      <label for="role">Role:</label>
      {{ role }}
    </div>

    <h2 class="mt-4">User Settings</h2>

    <div class="form-group">
      <label for="currentPassword">Current Password:</label>
      <input
        v-model="currentPassword"
        type="password"
        id="currentPassword"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="newPassword">New Password:</label>
      <input
        v-model="newPassword"
        type="password"
        id="newPassword"
        class="form-control"
      />
    </div>

    <div class="form-group">
      <label for="confirmPassword">Confirm New Password:</label>
      <input
        v-model="confirmPassword"
        type="password"
        id="confirmPassword"
        class="form-control"
      />
    </div>

    <button @click="changePassword" class="btn btn-primary">
      Change Password
    </button>

    <h2 class="mt-4">My Races</h2>
    <div class="race-grid">
      <div v-if="races.length > 0">
        <div v-for="race in races" :key="race._id">
          <div class="race-contanier">
            <div class="card-body">
              <img :src="race.image" class="card-img-top" alt="Race image" />
              <h5 class="card-title">
                <a>
                  {{ race.naziv }}
                </a>
              </h5>
              <p class="card-text">{{ race.tip }} - {{ race.lokacija }}</p>
              <p class="card-text">
                <small class="text-muted">{{ race.datum }}</small>
              </p>
              <button
                type="button"
                class="btn btn-warning"
                @click="IdiNaUredivanje(race)"
              >
                Uredi utrku
              </button>

              <button
                type="button"
                class="btn btn-danger"
                @click="IzbrisiUtrku(race)"
              >
                Izbriši utrku
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No races found for this user.</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/connection";
import store from "@/store";

export default {
  data() {
    return {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      races: [], 
    };
  },
  computed: {
    email() {
      return store.currentUser.email || "";
    },
    displayName: {
      get() {
        return store.currentUser.username || "";
      },
      set(newName) {
        store.currentUser.username = newName;
      },
    },
    role() {
      return store.currentUser.role || "N/A"; 
    },
  },
  methods: {
    async updateProfile() {
      try {
        const changeResponse = await api.put("/admin", {
          _id: store.currentUser._id,
          email: this.email,
          username: this.displayName,
        });
        alert("Profile successfully updated.");
      } catch (error) {
        console.error("An error occurred while updating the profile", error);
        alert("An error occurred. Please try again.");
      }
    },

    async changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("The new passwords do not match!");
        return;
      }
      try {
        const authResponse = await api.post("/authAdmin", {
          email: store.currentUser.email,
          password: this.currentPassword,
        });

        const passChangeResponse = await api.put("/passAdmin", {
          _id: store.currentUser._id,
          password: this.newPassword,
        });
        console.log("Password changed successfully", passChangeResponse);
      } catch (error) {
        console.error("An error occurred while changing the password", error);
        if (error.code === "auth/wrong-password") {
          alert("The current password is incorrect.");
        } else {
          alert("An error occurred. Please try again.");
        }
      }
    },

    async fetchRacesByCreator() {
      try {
       
        const response = await api.get(
          `/races/creator/${store.currentUser._id}`
        );
        const racesData = [];
        for (const race of response.data) {
          try {

            race.image = race.imageId
              ? `${process.env.VUE_APP_API_URL}/race/slika/${race._id}/image`
              : "default-image.jpg",

            
            racesData.push(race);
          } catch (error) {
            console.error("Error while processing race data:", error);
          }
        }
        this.races = racesData; 
      } catch (error) {
        console.error("Error fetching races by creator", error);
        alert("An error occurred while fetching races.");
      }
    },
    async IzbrisiUtrku(race) {
      try {
        console.log(race._id);
        await api.delete(`/race/${race._id}`);
        alert("Utrka je uspješno izbrisana.");
        this.getPosts();
      } catch (error) {
        console.error("Greška prilikom brisanja utrke:", error);
      }
    },
    IdiNaUredivanje(race) {
      console.log("Kliknuo si button", race);
      this.$router.push(`/uredi-utrku/${race._id}`);
    },
  },

  
  mounted() {
    this.fetchRacesByCreator();
  },
};
</script>

<style scoped>
.race-contanier {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.race-grid {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px; 
  justify-content: center; 
}

.card {
  width: 1000%; 
  height: 100%; 
  max-width: 500px;
  display: flex;
  flex-direction: column; 
}

.card-img-top {
  height: 180px;
  object-fit: cover;
}

.card-title a {
  color: rgb(255, 132, 0) !important;
  text-decoration: none;
  font-weight: bold;
}

.card-title a:hover {
  color: black !important;
}

.user-profile {
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.btn {
  margin-top: 10px;
  background-color: #f58634;
  border-color: #f58634;
  color: white;
}
.btn-warning {
  background-color: rgb(
    245,
    232,
    52
  ) !important; 
  border-color: rgb(245, 232, 52) !important;
}

.btn-danger {
  background-color: #d9534f !important; 
  border-color: #d9534f !important;
}
.mt-4 {
  margin-top: 40px;
}
</style>

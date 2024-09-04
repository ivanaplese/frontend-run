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
          readonly />
      </div>
  
      <div class="form-group">
        <label for="displayName">Name and Surname:</label>
        <input
          type="text"
          id="displayName"
          v-model="displayName"
          class="form-control" />
      </div>
  
      <button @click="updateProfile" class="btn btn-primary">
        Update Profile
      </button>

      <h2 class="mt-4">Your Favorites</h2>
    <ul>
      <li v-for="race in favorites" :key="race.id">
        {{ race.name }} - {{ race.location }}
      </li>
    </ul>


<h2 class="mt-4">User Settings</h2>

<div class="form-group">
  <label for="currentPassword">Current Password:</label>
  <input
    v-model="currentPassword"
    type="password"
    id="currentPassword"
    class="form-control" />
</div>

<div class="form-group">
  <label for="newPassword">New Password:</label>
  <input
    v-model="newPassword"
    type="password"
    id="newPassword"
    class="form-control" />
</div>

<div class="form-group">
  <label for="confirmPassword">Confirm New Password:</label>
  <input
    v-model="confirmPassword"
    type="password"
    id="confirmPassword"
    class="form-control" />
</div>

<button @click="changePassword" class="btn btn-primary">
  Change Password
</button>
    </div>
  </template>
  
  <script>
  import { auth } from "@/firebase.js";
  // import { onAuthStateChanged, updateProfile } from "firebase/auth";
//novo 31.8.

  import {
  onAuthStateChanged,
  updateProfile,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

import { db, collection, getDocs } from "@/firebase.js";

  export default {
    data() {
      return {
        email: "",
        displayName: "",
        currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      favorites: [],
      };
    },
    created() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.email = user.email;
          this.displayName = user.displayName || "";
          this.fetchFavorites();
        }
      });
    },
    methods: {
      updateProfile() {
        const user = auth.currentUser;
        updateProfile(user, {
          displayName: this.displayName,
        })
          .then(() => {
            alert("Profile successfully updated.");
          })
          .catch((error) => {
            console.error("An error occurred while updating the profile", error);
          alert("An error occurred. Please try again.");
        });
    },
    changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert("The new passwords do not match!");
        return;
      }
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        this.currentPassword
      );
      reauthenticateWithCredential(user, credential)
        .then(() => {
          return updatePassword(user, this.newPassword);
        })
        .then(() => {
          alert("Password successfully changed.");
          this.currentPassword = "";
          this.newPassword = "";
          this.confirmPassword = "";
        })
        .catch((error) => {
          console.error("An error occurred while changing the password", error);
          if (error.code === "auth/wrong-password") {
            alert("The current password is incorrect.");
          } else {
            alert("An error occurred. Please try again.");
          }
          });
      },

      fetchFavorites() {
      const favoritesCollection = collection(
        db,
        "users",
        this.email,
        "favorites"
      );
      getDocs(favoritesCollection)
        .then((querySnapshot) => {
          this.favorites = [];
          querySnapshot.forEach((doc) => {
            this.favorites.push(doc.data());
          });
        })
        .catch((error) => {
          console.error("Greška prilikom dohvaćanja favorita:", error);
        });
      },

    },
  };
  </script>
  
  <style scoped>
  .user-profile {
    max-width: 500px;
    margin: auto;
    padding: 20px;
  }
  .form-group {
    margin-bottom: 15px;
  }
  /* .btn {
    margin-top: 10px;
  } */
  .btn {
  margin-top: 10px;
  background-color: #f58634; /* Orange color */
  border-color: #f58634;
  color: white;
}
.mt-4 {
  margin-top: 40px;
}
  </style>